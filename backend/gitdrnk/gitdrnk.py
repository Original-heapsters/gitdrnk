import os
import uuid
from datetime import datetime


# Utility imports
from Database.Client import Encoder
from HookProcessing import Client as cHook



# Service imports
from services.util_service import *
from services.game_service import *
from services.player_service import *
from services.action_service import *


# Framework imports
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)
dbPath = os.environ.get('DB')
if dbPath is None or dbPath == "":
    dbPath = "mongodb://localhost:27017/gitdrnk"
app.config['MONGO_URI'] = dbPath
app.config['VERSION'] = "1.0.3"
app.json_encoder = Encoder.JSONEncoder
CORS(app)
socketio = SocketIO(app)
mongo = PyMongo(app).db


@app.route("/", methods=['GET'])
@app.route("/index", methods=['GET'])
def index():
    return "index"


@app.route("/health", methods=['GET'])
def health():
    return "Pass", 200


@app.route("/version", methods=['GET'])
def version():
    code = 200
    resp = {"ok": True, "version": app.config["VERSION"]}
    return jsonify(resp), code


@app.route("/game/new", methods=["POST"])
def game_new():
    data = request.get_json()
    resp, code = new_game(data, mongo)
    return jsonify(resp), code


@app.route("/game/join", methods=["POST"])
def game_join():
    data = request.get_json()
    resp, code = join_game(data, mongo)
    return jsonify(resp), code


@app.route("/games/all", methods=["GET"])
def games_all():
    resp, code = all_games(mongo)
    return jsonify(resp), code

@app.route("/game/rules", methods=["GET", "POST"])
def rules():
    if request.method == "GET":
        data = request.get_json()
        resp, code = get_rules(data, db)
    else:
        data = request.get_json()
        resp, code = set_rules(data, mongo)

    return jsonify(resp), code


@app.route("/player/new", methods=["POST"])
def add_player():
    data = request.get_json()
    resp, code = new_player(data, db)
    return jsonify(resp), code


@app.route("/player", methods=["GET"])
def player_get():
    data = request.get_json()
    resp, code = get_player(data, mongo)
    return jsonify(resp), code


@app.route("/players/all", methods=["GET"])
def players_all ():
    resp, code = get_all_players(mongo)
    return jsonify(resp), code

@app.route("/actions/all", methods=["GET"])
def actions_all():
    resp, code = get_all_actions(mongo)
    return jsonify(resp), code


@app.route("/client_hook", methods=["POST"])
def client_payload_received():
    # TODO Payload from client git-hook
    # data = request.get_json()
    # git_user = data["username"]
    # player = Helper.get_player_by_git_username(mongo.players, git_user)
    # client_proc = cHook.Client(player)
    # action = client_proc.process_payload(payload=data)
    # Helper.add_action(mongo.actions, action)
    # notify_room(action, 'default_room')
    return "pass", 200

@app.route("/web_hook", methods=["POST"])
def server_payload_received():
    # TODO Payload from server webhook
    # data = request.get_json()
    # print(data)
    # notify_room(data, 'default_room')
    # return jsonify(data)
    return "pass", 200

@app.route("/help/client_hooks/<platform>", methods=["GET"])
def sample_client_hooks(platform="unix"):
    if platform.lower() == "unix":
        return app.send_static_file('sample_client_hooks_unix.md')
    else:
        return app.send_static_file('sample_client_hooks_win.md')


@socketio.on('connect')
def git_event():
    eventJson = {"type": "eventId_1",
    "message": "new message"}
    print("Got an event")
    emit("gitevent", eventJson)


@socketio.on('join')
def on_join(data):
    print("Trying to join")
    username = data['username']
    game = data['game']
    join_room(game)
    print(username + " has entered the room: " + game)
    # send(username + ' has entered the room.', room=game)
    event = {"type":"join","user": username, "game": game}
    notify_room(event, game)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    game = data['game']
    leave_room(game)
    print(username + " has left the room: " + game)
    # send(username + ' has left the room.', room=game)
    event = {"type":"leave","user": username, "game": game}
    notify_room(event, game)

def notify_room(event_json, room_id):
    event_json["id"] = str(uuid.uuid4())
    event_json["date"] = str(datetime.now())
    emit('gitdrnkevent', event_json,room=room_id)

@app.route("/socket_test")
def socket_test():
    return render_template('socket_test.html')


@app.route("/site-map")
def site_map():
    resp, code = get_sitemap(app.url_map)
    return jsonify(resp), code


@app.route("/seed_db")
def seed():
    resp, code = seed_db(mongo)
    return jsonify(resp), code

@app.route("/nukeeverything", methods=['GET'])
def nuke_everything():
    resp, code = nuke(mongo)
    return jsonify(resp), code



if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)

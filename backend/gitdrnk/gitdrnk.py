import os

from gevent import monkey

# Utility imports
from Database.Client import Encoder

monkey.patch_all()

# Service imports
from services.util_service import *
from services.game_service import *
from services.player_service import *
from services.action_service import *
from services.client_hook_service import *

# Socket imports
from sockets.chat_socket import *
from sockets.action_socket import *

# Framework imports
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_socketio import SocketIO, emit, leave_room

app = Flask(__name__)
dbPath = os.environ.get('DB')
if dbPath is None or dbPath == "":
    #export mongodb+srv://REDACTED_USER:REDACTED_PASSWORD@gitdrnk-sandbox-m3rwj.mongodb.net/test?retryWrites=true&w=majority
    dbPath = "mongodb://localhost:27017/gitdrnk"
app.config['MONGO_URI'] = dbPath
app.config['MONGO_CHAT_URI'] = dbPath
app.config['AUDIO_DIR'] = os.path.join(os.getcwd(), "static", "audio")
app.config['VERSION'] = "1.0.5"
app.json_encoder = Encoder.JSONEncoder
CORS(app)
socketio = SocketIO(app, message_queue=app.config['MONGO_CHAT_URI'], cors_allowed_origins='*')
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

@app.route("/game/leave", methods=["POST"])
def game_leave():
    data = request.get_json()
    resp, code = leave_game(data, mongo)
    return jsonify(resp), code


@app.route("/game/chat", methods=["GET"])
def game_chat():
    global code, resp
    if request.method == "GET":
        game_id = request.args.get("game_id", None)
        if game_id:
            resp, code = get_chat_log(mongo, game_id)
        return jsonify(resp), code
    return jsonify({"ok": False, "message": "Internal server error"}), 503


@app.route("/games/all", methods=["GET"])
def games_all():
    resp, code = all_games(mongo)
    return jsonify(resp), code


@app.route("/game/rules", methods=["GET", "POST"])
def rules():
    if request.method == "GET":
        data = request.args.get("game_id", None)
        resp, code = get_rules(data, mongo)
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
def players_all():
    resp, code = get_all(mongo)
    return jsonify(resp), code


@app.route("/actions/action_log", methods=["GET"])
def game_actions():
    global code, resp
    if request.method == "GET":
        game_id = request.args.get("game_id", None)
        if game_id:
            resp, code = get_action_log(mongo, game_id)
        return jsonify(resp), code
    return jsonify({"ok": False, "message": "Internal server error"}), 503

@app.route("/actions/all", methods=["GET"])
def actions_all():
    resp, code = get_all(mongo)
    return jsonify(resp), code

@app.route("/client_hook", methods=["POST"])
def client_payload_received():
    data = request.get_json()
    path_to_assets = app.config['AUDIO_DIR']
    resp, code = handle_client_hook(mongo, data, path_to_assets)

    return jsonify(resp), code


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



####### Socket functionality
@socketio.on('connect')
def git_event():
    event_json = {"type": "eventId_1", "message": "new message"}
    print("Got an event")
    emit("gitevent", event_json)


@socketio.on('join_chat')
def on_join_chat(data):
    join_chat(data, mongo)

@socketio.on('leave_chat')
def on_leave_chat(data):
    leave_chat(data, mongo)


@socketio.on('send_chat')
def on_send_chat(data):
    send_chat_message(data, mongo)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    game = data['game']
    leave_room(game)
    print(username + " has left the room: " + game)
    # send(username + ' has left the room.', room=game)
    event = {"type": "leave", "user": username, "game": game}
    notify_room(event, game)


def notify_room(event_json, room_id):
    event_json["id"] = str(uuid.uuid4())
    event_json["date"] = str(datetime.now())
    emit('gitdrnkevent', event_json, room=room_id)

####### Socket functionality


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)

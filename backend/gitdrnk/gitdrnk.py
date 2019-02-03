import os
from flask_pymongo import PyMongo
from Database.Client import Encoder
from Database.Client import Helper
from HookProcessing import Client as cHook
from flask import Flask, request, jsonify, url_for, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
dbPath = os.environ.get('DB')
if dbPath is None or dbPath == "":
    dbPath = "mongodb://localhost:27017/gitdrnk"
app.config['MONGO_URI'] = dbPath
app.config['VERSION'] = "1.0.2"
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
    return "Health Check"


@app.route("/version", methods=['GET'])
def version():
    return app.config["VERSION"]


@app.route("/nukeeverything", methods=['GET'])
def nuke_everything():
    mongo.players.remove()
    mongo.games.remove()
    mongo.actions.remove()
    mongo.rules.remove()

    return "I hope you know what you just did"


@app.route("/game/new", methods=["POST"])
def new_game():
    data = request.get_json()
    game_id = data.get("game_id", None)
    existing_games = Helper.get_games_by_id(mongo.games, game_id)
    if len(existing_games) > 0:
        return jsonify({"ok": False, "message": "Game with that id already exists!", "game_id": game_id}), 400

    if game_id is not None:
        Helper.create_game(mongo.games, game_id)
        response = {"ok": True, "message": "Game created successfully!"}
        return jsonify(response), 200
    else:
        return jsonify({"ok": False, "message": "Missing game_id!"}), 400


@app.route("/game/join", methods=["POST"])
def join_game():
    data = request.get_json()

    game_id = data.get("game_id", None)
    username = data.get("username", None)

    if game_id is not None and username is not None:
        player = Helper.get_player_by_username(mongo.players, username)
        if player is not None:
            Helper.add_player_to_game(mongo.games, game_id, player)
            found_game = Helper.get_game(mongo.games, game_id)
            return jsonify(found_game), 200

    return jsonify({"ok": False, "message": "Missing game_id!"}), 400


@app.route("/games/all", methods=["GET"])
def all_games():
    found_games = Helper.get_all_games(mongo.games)
    return jsonify(found_games), 200


@app.route("/player/new", methods=["POST"])
def add_player():
    data = request.get_json()

    username = data.get("username", None)
    git_username = data.get("git_username", None)
    existing_users = Helper.get_players_by_username(mongo.players, username)
    if len(existing_users) > 0:
        return jsonify({"ok": False, "message": "username exists!"}), 400

    if username is not None:
        new_user = {"username": username, "git_username": git_username}
        Helper.create_player(mongo.players, username, new_user)
        response = {"ok": True, "message": "Player created successfully!"}
        return jsonify(response), 200
    else:
        return jsonify({"ok": False, "message": "Missing username!"}), 400


@app.route("/player", methods=["GET"])
def get_player():
    data = request.get_json()
    username = data.get("username", None)

    if username is not None:
        found_player = Helper.get_player_by_username(mongo.players, username)
        actions = Helper.get_actions_by_username(mongo.actions, username)
        found_player["actions"] = actions
        return jsonify(found_player), 200

    return jsonify({"ok": False, "message": "Missing username!"}), 400


@app.route("/players/all", methods=["GET"])
def get_all_players():
    found_players = Helper.get_all_players(mongo.players)
    return jsonify(found_players), 200

@app.route("/actions/all", methods=["GET"])
def get_all_actions():
    found_actions = Helper.get_all_actions(mongo.actions)
    return jsonify(found_actions), 200


@app.route("/payload", methods=["POST"])
def payload_received():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route("/client_hook", methods=["POST"])
def client_payload_received():
    data = request.get_json()
    git_user = data["username"]
    player = Helper.get_player_by_git_username(mongo.players, git_user)
    client_proc = cHook.Client(player)
    action = client_proc.process_payload(payload=data)
    Helper.add_action(mongo.actions, action)
    return jsonify(action)

@app.route("/web_hook", methods=["POST"])
def server_payload_received():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route("/help/client_hooks/<platform>", methods=["GET"])
def sample_client_hooks(platform="unix"):
    if platform.lower() == "unix":
        return app.send_static_file('sample_client_hooks_unix.md')
    else:
        return app.send_static_file('sample_client_hooks_win.md')


@app.route("/game/rules", methods=["GET", "POST"])
def rules():
    if request.method == "GET":
        data = request.get_json()
        game_id = None
        if data:
            game_id = data.get("game_id", None)

        if game_id is not None:
            rules = Helper.get_rules_for_game(mongo.rules, game_id)
            return jsonify(rules), 200
        else:
            rulesets = Helper.get_all_rules(mongo.rules)
            print(str(rulesets))
            return jsonify(rulesets), 200
    else:
        data = request.get_json()
        game_id = data.get("game_id", None)
        rules = data.get("ruleset", None)
        if game_id is not None and rules is not None:
            rules["game_id"] = game_id
            Helper.update_ruleset(mongo.rules, game_id, rules)
            return jsonify({"ok": True, "message": "Rules updated successfully!"}), 200
        return jsonify({"ok": False, "message": "Missing game_id or ruleset!"}), 400



@socketio.on('connect')
def git_event():
    eventJson = {"id": "eventId_1",
    "message": "new message"}
    print("Got an event")
    emit("gitevent", eventJson)

@app.route("/socket_test")
def socket_test():
    return render_template('socket_test.html')




@app.route("/site-map")
def site_map():
    import urllib
    output = []
    for rule in app.url_map.iter_rules():

        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        methods = ','.join(rule.methods)
        url = url_for(rule.endpoint, **options)
        line = urllib.parse.unquote("{:25s} {:25s} {}".format(rule.endpoint, methods, url))
        output.append(line)

    return jsonify(sorted(output))

@app.route("/seed_db")
def seed_db():
    Helper.seed_players_db(mongo.players)
    Helper.seed_games_db(mongo.games)
    Helper.seed_actions_db(mongo.actions)
    Helper.seed_rules_db(mongo.rules)
    return "Done"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)

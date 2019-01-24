import os
from flask_pymongo import PyMongo
from Database.Client import Encoder
from Database.Client import Helper
from flask import Flask, request, jsonify, url_for

app = Flask(__name__)
app.config['MONGO_URI'] = os.environ.get('DB')
app.config['VERSION'] = "1.0.0"
app.json_encoder = Encoder.JSONEncoder
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
    existing_users = Helper.get_players_by_username(mongo.players, username)
    if len(existing_users) > 0:
        return jsonify({"ok": False, "message": "username exists!"}), 400

    if username is not None:
        Helper.create_player(mongo.players, username)
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
        return jsonify(found_player), 200

    return jsonify({"ok": False, "message": "Missing username!"}), 400


@app.route("/players/all", methods=["GET"])
def get_all_players():
    found_players = Helper.get_all_players(mongo.players)
    return jsonify(found_players), 200


@app.route("/payload", methods=["POST"])
def payload_received():
    data = request.get_json()
    print(data)
    return jsonify(data)


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
        line = urllib.parse.unquote("{:25s} {:20s} {}".format(rule.endpoint, methods, url))
        output.append(line)

    return jsonify(sorted(output))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
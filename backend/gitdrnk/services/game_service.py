from Database.Client import Helper

def new_game(data, db):
    code = 503
    resp = {"ok": False, "message": "Internal server error"}

    game_id = data.get("game_id", None)
    existing_games = Helper.get_games_by_id(db.games, game_id)
    if len(existing_games) > 0:
        code = 400
        resp["message"] = "A game with game_id already exists"
    else:
        if not game_id:
            code = 400
            resp["message"] = "Missing game_id"
        else:
            Helper.create_game(db.games, game_id)
            code = 200
            resp["ok"] = True
            resp["message"] = "Game created successfully"


    return resp, code

def join_game(data, db):
    code = 503
    resp = {"ok": False, "message": "Internal server error"}

    game_id = data.get("game_id", None)
    username = data.get("username", None)

    if game_id is not None and username is not None:
        player = Helper.get_player_by_username(db.players, username)
        if player is not None:
            Helper.add_player_to_game(db.games, game_id, player)
            found_game = Helper.get_game(db.games, game_id)

            resp = found_game
            code = 200
        else:
            code = 400
            resp["message"] = username + " could not be found in the player database"
    else:
        code = 400
        error = "Missing: "
        if not game_id:
            error += "game_id"
        if not username:
            error += "username"
        resp["message"] = error

    return resp, code


def all_games():
    pass

def game_rules():
    pass

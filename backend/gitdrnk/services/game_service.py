from Database.Client import Helper

def new_game(data, db):
    code = 503
    resp = {"ok": False, "message": "Internal server error"}

    game_id = data.get("game_id", None)
    if not game_id:
        code = 400
        resp["message"] = "Missing game_id"
        return resp, code

    existing_games = Helper.get_games_by_id(db.games, game_id)
    if len(existing_games) > 0:
        code = 400
        resp["message"] = "A game with game_id already exists"
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

            code = 200
            resp["ok"] = True
            resp["message"] = "Success"
            resp["game"] = found_game
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


def all_games(db):
    code = 503
    resp = {"ok": False, "message": "Internal server error"}
    found_games = Helper.get_all_games(db.games)

    if len(found_games) > 0:
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["games"] = found_games
    else:
        code = 200
        resp["ok"] = True
        resp["message"] = "No games found"

    return resp, code

def get_chat_log(db, game_id):
    code = 200
    resp = {"ok": True, "message": "No chat logs found"}
    transcript = Helper.get_chat_log(db.chats, game_id)
    print(transcript)
    if len(transcript) > 0:
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["transcript"] = transcript

    return resp, code




def get_rules(game_id, db):
    code = 503
    resp = {"ok": False, "message": "Internal server error"}
    game = None
    if game_id:
        game = game_id

    if game_id is not None:
        rules = Helper.get_rules_for_game(db.rules, game_id)
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["rules"] = rules

    else:
        rulesets = Helper.get_all_rules(db.rules)
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["rules"] = rulesets

    return resp, code

def set_rules(data, db):
    code = 503
    resp = {"ok": False, "message": "Internal server error"}
    game_id = data.get("game_id", None)
    rules = data.get("ruleset", None)

    if game_id is not None and rules is not None:
        Helper.update_ruleset(db.rules, game_id, rules)
        code = 200
        resp["ok"] = True
        resp["message"] = "Rules updated successfully"
    else:
        code = 400
        error = "Missing: "
        if not game_id:
            error += "game_id"
        if not rules:
            error += "rules"
        resp["message"] = error
    return resp, code

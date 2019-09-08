from Database.Client import Helper


def new_game(data, db):
    resp = {"ok": False, "message": "Internal server error"}

    game_id = data.get("game_id", None)
    if not game_id:
        code = 400
        resp["message"] = "Missing game_id"
        return resp, code

    existing_games = Helper.get_by_key(db.games, "game_id", game_id)
    if len(existing_games) > 0:
        code = 400
        resp["message"] = "A game with game_id already exists"
    else:
        Helper.create(db.games, game_id)
        code = 200
        resp["ok"] = True
        resp["message"] = "Game created successfully"

    return resp, code


def join_game(data, db):
    resp = {"ok": False, "message": "Internal server error"}

    game_id = data.get("game_id", None)
    email = data.get("email", None)

    if game_id is not None and email is not None:
        player = Helper.get_by_key(db.players, "email", email)
        if player is not None:
            Helper.add_player_to_game(db.games, game_id, player)
            found_game = Helper.get_by_key(db.games, "game_id", game_id)

            code = 200
            resp["ok"] = True
            resp["message"] = "Success"
            resp["game"] = found_game
        else:
            code = 400
            resp["message"] = email + " could not be found in the player database"
    else:
        code = 400
        error = "Missing: "
        if not game_id:
            error += "game_id"
        if not email:
            error += "email"
        resp["message"] = error

    return resp, code


def all_games(db):
    resp = {"ok": False, "message": "Internal server error"}
    found_games = Helper.get_all(db.games)

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
    chat_obj = Helper.get_by_key(db.chats, "game_id", game_id)
    if chat_obj:
        transcript = chat_obj["chat"]
        print(transcript)
        if len(transcript) > 0:
            code = 200
            resp["ok"] = True
            resp["message"] = "Success"
            resp["transcript"] = transcript

    return resp, code

def get_action_log(db, game_id):
    code = 200
    resp = {"ok": True, "message": "No action logs found"}
    action_obj = Helper.get_by_key(db.actions, "game_id", game_id)
    if action_obj:
        action_log = action_obj["actions"]
        print(action_log)
        if len(action_log) > 0:
            code = 200
            resp["ok"] = True
            resp["message"] = "Success"
            resp["action_log"] = action_log

    return resp, code


def get_rules(game_id, db):
    resp = {"ok": False, "message": "Internal server error"}
    if game_id:
        pass

    if game_id is not None:
        rules = Helper.get_by_key(db.rules, "game_id", game_id)
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["rules"] = rules

    else:
        rulesets = Helper.get_all(db.rules)
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["rules"] = rulesets

    return resp, code


def set_rules(data, db):
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

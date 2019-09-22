from Database.Client import Helper


def new_player(data, db):
    resp = {"ok": False, "message": "Internal server error"}

    username = data.get("username", None)
    git_username = data.get("git_username", None)
    email = data.get("email", None)

    if not username:
        code = 400
        resp["message"] = "Missing username"
        return resp, code

    existing_user = Helper.get_by_key(db.players, "email", email)
    if existing_user:
        if existing_user["git_username"] != git_username:
            new_user = {"username": username, "git_username": git_username}
            Helper.create(db.players, "username", username, new_user)
            code = 200
            resp["ok"] = True
            resp["message"] = "Player updated successfully"
        else:
            code = 200
            resp["ok"] = True
            resp["message"] = "Player already exists, no changes"
    else:
        new_user = {"username": username, "git_username": git_username, "email": email}
        Helper.create(mongo.players, "email", email, new_user)
        code = 200
        resp["ok"] = True
        resp["message"] = "Player created successfully"

    return resp, code


def get_player(data, db):
    resp = {"ok": False, "message": "Internal server error"}
    email = data.get("email", None)

    if email is not None:
        found_player = Helper.get_by_key(db.players, "email", email)

        actions = Helper.get_all(db.actions)
        found_player["actions"] = actions
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["players"] = found_player
    else:
        code = 400
        resp["message"] = "Missing email"

    return resp, code

def get_players_by_gameid(db, game_id):
    resp = {"ok": False, "message": "Internal server error"}
    players_obj = Helper.get_by_key(db.players, "game_id", game_id)
    if players_obj:
        if len(transcript) > 0:
            code = 200
            resp["ok"] = True
            resp["message"] = "Success"
            resp["players"] = found_player

    return resp, code

def get_all(db):
    resp = {"ok": False, "message": "Internal server error"}
    found_players = Helper.get_all(db.players)

    if len(found_players) > 0:
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["players"] = found_players
    else:
        code = 200
        resp["ok"] = True
        resp["message"] = "No games found"

    return resp, code

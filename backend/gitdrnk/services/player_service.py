from Database.Client import Helper


def new_player(data, db):
    resp = {"ok": False, "message": "Internal server error"}

    username = data.get("username", None)
    git_username = data.get("git_username", None)

    if not username:
        code = 400
        resp["message"] = "Missing username"
        return resp, code

    existing_users = Helper.get_by_key(db.players, "username", username)
    if len(existing_users) > 0:
        user = existing_users[0]
        if user["git_username"] != git_username:
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
        new_user = {"username": username, "git_username": git_username}
        Helper.create(mongo.players, "username", username, new_user)
        code = 200
        resp["ok"] = True
        resp["message"] = "Player created successfully"

    return resp, code


def get_player(data, db):
    resp = {"ok": False, "message": "Internal server error"}
    username = data.get("username", None)

    if username is not None:
        found_player = Helper.get_by_key(db.players, "username", username)

        actions = Helper.get_all(db.actions)
        found_player["actions"] = actions
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["players"] = found_player
    else:
        code = 400
        resp["message"] = "Missing username"

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

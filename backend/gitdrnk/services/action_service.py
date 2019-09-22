from Database.Client import Helper
import sockets


def get_all_actions(db):
    resp = {"ok": False, "message": "Internal server error"}
    found_actions = Helper.get_all(db.actions)

    if len(found_actions) > 0:
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["actions"] = found_actions
    else:
        code = 200
        resp["ok"] = True
        resp["message"] = "No actions found"

    return resp, code

def update_action(db, data):
    resp = {"ok": False, "message": "Internal server error"}

    game_id = data.get("game_id", None)
    action_id = data.get("action_id", None)

    if action_id is not None and game_id is not None:
        action_obj = Helper.get_by_key(db.actions, "game_id", game_id)
        if action_obj is not None:
            action = next(action for action in action_obj["actions"] if action["_id"]==action_id)
            action["complete"] = True
            Helper.update_data(db.actions,"game_id", game_id, action_obj)
            code = 200
            resp["ok"] = True
            resp["message"] = "Success"
            resp["action"] = action
            sockets.action_socket.send_action_complete(action, game_id)
        else:
            code = 400
            resp["message"] = email + " could not be found in the player database"
    else:
        code = 400
        error = "Missing: action_id"
        resp["message"] = error

    return resp, code

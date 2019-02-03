from Database.Client import Helper

def get_all_actions(db):
    code = 503
    resp = {"ok": False, "message": "Internal server error"}
    found_actions = Helper.get_all_actions(db.actions)

    if len(found_actions) > 0:
        code = 200
        resp["ok"] = True
        resp["message"] = "Success"
        resp["actions"] = found_actions
    else:
        code = 200
        resp["ok"] = True
        resp["message"] = "No actions found"

    return resp,code

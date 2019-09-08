from Database.Client import Helper
from HookProcessing import Client as cHook
from sockets.action_socket import *


def handle_client_hook(player_db, rule_db, action_db, data, audio_dir):
    code = 503
    resp = {"ok": False, "message": "Internal server error"}

    git_user = data.get("git_username", None)
    if not git_user:
        resp["message"] = "Missing git_username"
    else:
        player = Helper.get_by_key(player_db, "git_username", git_user)
        game = data.get("game_id", None)
        if player and game:
            rule_def = Helper.get_by_key(rule_db, "game_id", game)
            client_proc = cHook.Client(player, game, audio_dir)
            action = client_proc.process_payload(payload=data, rule_def=rule_def)
            Helper.upsert_data(action_db, "game_id", game, action, "actions")
            code = 200
            resp["ok"] = True
            resp["message"] = "Success"
            resp["action"] = action

            send_action_message(action)

    return resp, code

import os
import zipfile
import tempfile
import shutil

from Database.Client import Helper
from HookProcessing import Client as cHook
from sockets.action_socket import *


def handle_client_hook(db, data, audio_dir):
    code = 503
    resp = {"ok": False, "message": "Internal server error"}

    email = data.get("email", None)
    if not email:
        resp["message"] = "Missing email"
    else:
        player = Helper.get_by_key(db.players, "email", email)
        game = data.get("game_id", None)
        if player and game:
            rule_def = Helper.get_by_key(db.rules, "game_id", game)
            client_proc = cHook.Client(player, game, audio_dir)
            action = client_proc.process_payload(payload=data, rule_def=rule_def)
            Helper.upsert_data(db.actions, "game_id", game, action, "actions")
            code = 200
            resp["ok"] = True
            resp["message"] = "Success"
            resp["action"] = action

            send_action_message(action)

    return resp, code

def get_client_scripts(input_file, db, game_id, platform):
    if game_id is not None:
        ruleset = Helper.get_by_key(db.rules, "game_id", game_id)
        key_names = [x["key"] for x in ruleset["definition"]]
        dirpath = tempfile.mkdtemp()
        script_paths = []

        for key_name in key_names:
            script_paths.append(create_script_file(input_file, dirpath , key_name, platform))

        scripts_zip = os.path.join(dirpath, "git_hook_scripts.zip")
        zipf = zipfile.ZipFile(scripts_zip, 'w', zipfile.ZIP_DEFLATED)
        for hook_script in script_paths:
            zipf.write(hook_script, os.path.basename(hook_script))

        return scripts_zip


def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))

def create_script_file(input_file, output_dir, output_hook, platform):
    with open(input_file) as f:
        if platform == "unix":
            out_file = output_hook + ".sh"
        elif platform == "windows":
            out_file = output_hook + ".bat"
        else:
            print("ERROR " + platform + " not supported!")
        out_file = os.path.join(output_dir, out_file)
        with open(out_file, "w") as out:
            for line in f:
                out.write(line)
    return out_file

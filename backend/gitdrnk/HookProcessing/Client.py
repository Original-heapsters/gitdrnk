import uuid

from flask import url_for

from Util.AudioUtil import *

class Client(object):
    def __init__(self, player, game, audio_path=""):
        self.audio_path = audio_path
        self.player = player
        self.game_id = game
        self.action = None
        self.consequence = None
        self._id = None
        self.date = None
        print("Client hook")

    def process_payload(self, payload, rule_def):
        self._id = str(uuid.uuid4())
        print("\n\n_________________\n\n")
        print(self.player)
        #print(self.player["git_username"])
        print("processing")
        self.action = payload["action"]
        self.consequence = self.get_consequence(payload["action"], rule_def["definition"])
        self.date = payload["date"]
        print("\n\n_________________\n\n")
        return self.get_action()

    def get_consequence(self, action, rule_list):
        rule = next(filter(lambda x:x["key"]==action, rule_list), None)
        return rule["rule"]

    def get_action(self):
        audio_file = get_random_audio_path(self.audio_path)
        audio_path = url_for('static', filename="audio/" + audio_file)
        action_obj = {
            "game_id": self.game_id,
            "_id": self._id,
            "action": self.action,
            "consequence": self.consequence,
            "username": self.player.get("username", self.player["email"]),
            "email": self.player["email"],
            "git_username": self.player.get("git_username",self.player["email"]),
            "profile_picture": self.player.get("profile_picture",""),
            "date": self.date,
            "audio": audio_path[1:]
        }

        return action_obj

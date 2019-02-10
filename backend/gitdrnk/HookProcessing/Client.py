from Util.AudioUtil import *
import uuid
from flask import url_for

class Client(object):
    def __init__(self, player, game, audio_path="", host_url=""):
        self.audio_path = audio_path
        self.host_url = host_url
        self.player = player
        self.game_id = game
        self.player_id = None
        self.player_git_id = None
        self.action = None
        self.action_id = None
        self.date = None
        print("Client hook")

    def process_payload(self, payload):
        self.action_id = str(uuid.uuid4())
        print("\n\n_________________\n\n")
        print(self.player)
        print(self.player["git_username"])
        print("processing")
        self.player_id = self.player["username"]
        self.player_git_id = self.player["git_username"]
        self.action = payload["action"]
        self.date = payload["date"]
        print("\n\n_________________\n\n")
        return self.get_action()

    def get_action(self):
        audio_file = get_random_audio_path(self.audio_path)
        audio_path = url_for('static', filename="audio/" + audio_file)
        action_obj = {
            "game_id": self.game_id,
            "action_id": self.action_id,
            "action":self.action,
            "username": self.player_id,
            "git_username": self.player_git_id,
            "date": self.date,
            "audio": self.host_url + audio_path[1:]
        }

        return action_obj

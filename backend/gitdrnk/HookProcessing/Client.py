import uuid
import json

class Client(object):
    def __init__(self, player):
        self.player = player
        self.player_id = None
        self.action = None
        self.action_id = None
        self.date = None
        print("Client hook")

    def process_payload(self, payload):
        self.action_id = str(uuid.uuid4())
        print("\n\n_________________\n\n")
        print(self.player["username"])
        print(self.player["git_username"])
        print("processing")
        self.player_id = self.player["username"]
        self.action = payload["action"]
        self.date = payload["date"]
        print("\n\n_________________\n\n")
        return self.get_action()

    def get_action(self):
        action_obj = {
        "action_id": self.action_id,
        "action":self.action,
        "player_id": self.player_id,
        "date": self.date,
        }

        return action_obj

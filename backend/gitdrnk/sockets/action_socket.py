import uuid
from datetime import datetime

from gitdrnk import socketio


def send_action_message(data):
    print("action being processed")
    game = data['game_id']
    notify_room(data, game)


def notify_room(event_json, game_id):
    if not event_json or not game_id:
        print("Event json or game id was null")
        return
    print("About to send " + str(event_json))
    if "_id" not in event_json:
        event_json["_id"] = str(uuid.uuid4())

    print("Sending " + str(event_json))

    socketio.emit('gitdrnk_action', event_json)  # , namespace=game_id)

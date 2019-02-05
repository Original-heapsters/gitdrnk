import uuid
from datetime import datetime
from flask_socketio import SocketIO, send, emit, join_room, leave_room


def join_chat(data):
    print("Trying to join")
    username = data['username']
    game = data['gameId']

    if username and game:
        join_room(game)
        print(username + " has entered the room: " + game)
        event = {"type": "join", "username": username, "gameId": game}
        notify_room(event, game)

def send_chat_message(data):
    print("Message being processed")
    username = data['username']
    game = data['gameId']
    message = data['message']

    if username and game and message:
        event = {"type": "message", "username": username, "gameId": game, "message": message}
        notify_room(event, game)


def notify_room(event_json, game_id):
    if not event_json or not game_id:
        print("Event json or game id was null")
        return

    event_json["_id"] = str(uuid.uuid4())
    event_json["date"] = str(datetime.now())
    emit('gitdrnk_chat', event_json, room=game_id)
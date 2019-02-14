import uuid
from datetime import datetime
from Database.Client import Helper
from flask_socketio import emit, join_room


def join_chat(data):
    print("Trying to join")
    username = data['username']
    game = data['gameId']

    if username and game:
        join_room(game)
        print(username + " has entered the room: " + game)
        event = {"type": "join", "username": username, "gameId": game}
        notify_room(event, game)

def send_chat_message(data, db):
    print("Message being processed")
    username = data['username']
    game = data['gameId']
    message = data['message']


    chatObj = {
        "_id": str(uuid.uuid4()),
        "username":username,
        "gameId": game,
        "message": message,
        "date": str(datetime.now())
    }
    Helper.add_chat_message(db.chats, game, chatObj)


    if username and game and message:
        event = {"type": "message", "username": username, "gameId": game, "message": message}
        notify_room(event, game)


def notify_room(event_json, game_id):
    if not event_json or not game_id:
        print("Event json or game id was null")
        return

    if "_id" not in event_json and "date" not in event_json:
        event_json["_id"] = str(uuid.uuid4())
        event_json["date"] = str(datetime.now())

    print("Sending " + str(event_json))
    emit('gitdrnk_chat', event_json, room=game_id)
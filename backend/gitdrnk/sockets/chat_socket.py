import uuid
from datetime import datetime

from flask_socketio import emit, join_room, leave_room

from Database.Client import Helper


def join_chat(data, db):
    print("Trying to join")
    username = data['username']
    game = data['gameId']

    if username and game:
        join_room(game)
        print(username + " has entered the room: " + game)
        joinObj = {
            "_id": str(uuid.uuid4()),
            "username": username,
            "gameId": game,
            "type": "join",
            "action": "join",
            "date": str(datetime.now())
        }
        Helper.upsert_data(db.actions, "game_id", game, joinObj, "actions")
        notify_room(joinObj, game)

def leave_chat(data, db):
    print("Trying to leave")
    username = data['username']
    game = data['gameId']

    if username and game:
        leave_room(game)
        print(username + " has left the room: " + game)
        leaveObj = {
            "_id": str(uuid.uuid4()),
            "username": username,
            "gameId": game,
            "type": "leave",
            "action": "leave",
            "date": str(datetime.now())
        }
        Helper.upsert_data(db.actions, "game_id", game, leaveObj, "actions")
        notify_room(leaveObj, game)


def send_chat_message(data, db):
    print("Message being processed")
    username = data['username']
    game = data['gameId']
    message = data['message']

    chatObj = {
        "_id": str(uuid.uuid4()),
        "username": username,
        "gameId": game,
        "message": message,
        "date": str(datetime.now())
    }
    Helper.upsert_data(db.chats, "game_id", game, chatObj, "chat")

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

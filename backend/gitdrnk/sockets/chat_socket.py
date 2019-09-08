import uuid
from datetime import datetime

from flask_socketio import emit, join_room, leave_room

from Database.Client import Helper

default_profile = "https://p7.hiclipart.com/preview/981/645/182/united-states-computer-icons-desktop-wallpaper-clip-art-free-high-quality-person-icon.jpg"

def join_chat(data, db):
    print("Trying to join")
    email = data['email']
    game = data['gameId']

    if email and game:
        join_room(game)
        print(email + " has entered the room: " + game)
        player = Helper.get_by_key(db.players, "email", email)
        joinObj = {
            "_id": str(uuid.uuid4()),
            "username": player.get("username", email),
            "profile_picture": player.get("profile_picture", default_profile),
            "gameId": game,
            "type": "join",
            "action": "join",
            "date": str(datetime.now())
        }
        Helper.upsert_data(db.actions, "game_id", game, joinObj, "actions")
        notify_room(joinObj, game)

def leave_chat(data, db):
    print("Trying to leave")
    email = data['email']
    game = data['gameId']

    if email and game:
        leave_room(game)
        print(email + " has left the room: " + game)
        player = Helper.get_by_key(db.players, "email", email)
        leaveObj = {
            "_id": str(uuid.uuid4()),
            "username": player.get("username", email),
            "profile_picture": player.get("profile_picture", default_profile),
            "gameId": game,
            "type": "leave",
            "action": "leave",
            "date": str(datetime.now())
        }
        Helper.upsert_data(db.actions, "game_id", game, leaveObj, "actions")
        notify_room(leaveObj, game)


def send_chat_message(data, db):
    print("Message being processed")
    email = data['email']
    game = data['gameId']
    message = data['message']
    player = Helper.get_by_key(db.players, "email", email)

    chatObj = {
        "_id": str(uuid.uuid4()),
        "username": player.get("username", email),
        "profile_picture": player.get("profile_picture", default_profile),
        "gameId": game,
        "message": message,
        "date": str(datetime.now())
    }
    Helper.upsert_data(db.chats, "game_id", game, chatObj, "chat")

    if email and game and message:
        event = {"type": "message",
        "username": player.get("username", email),
        "profile_picture": player.get("profile_picture", default_profile),
        "gameId": game,
        "message": message}
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

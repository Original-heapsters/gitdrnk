import uuid
from datetime import datetime

from flask_socketio import emit, join_room, leave_room

from Database.Client import Helper

default_profile = "https://p7.hiclipart.com/preview/981/645/182/united-states-computer-icons-desktop-wallpaper-clip-art-free-high-quality-person-icon.jpg"

def join_chat(data, db):
    print("Trying to join")
    username = data.get("username", None)
    email = data['email']
    game = data['gameId']
    date = data['dateTime']

    if email and game:
        join_room(game)
        print(email + " has entered the room: " + game)
        player = Helper.get_by_key(db.players, "email", email)
        if not player:
            player = populate_player(db, username, email)

        joinObj = {
            "_id": str(uuid.uuid4()),
            "username": player.get("username", email),
            "git_username": player.get("git_username", email),
            "email": player.get("email", email),
            "profile_picture": player.get("profile_picture", default_profile),
            "gameId": game,
            "type": "join",
            "action": "join",
            "date": date
        }
        Helper.upsert_data(db.actions, "game_id", game, joinObj, "actions")
        notify_room(joinObj, game)

def leave_chat(data, db):
    print("Trying to leave")
    email = data['email']
    game = data['gameId']
    date = data['dateTime']

    if email and game:
        leave_room(game)
        print(email + " has left the room: " + game)
        player = Helper.get_by_key(db.players, "email", email)
        leaveObj = {
            "_id": str(uuid.uuid4()),
            "username": player.get("username", email),
            "git_username": player.get("git_username", email),
            "email": player.get("email", email),
            "profile_picture": player.get("profile_picture", default_profile),
            "gameId": game,
            "type": "leave",
            "action": "leave",
            "date": date
        }
        Helper.upsert_data(db.actions, "game_id", game, leaveObj, "actions")
        notify_room(leaveObj, game)


def send_chat_message(data, db):
    print("Message being processed")
    email = data['email']
    game = data['gameId']
    message = data['message']
    date = data['dateTime']
    player = Helper.get_by_key(db.players, "email", email)

    chatObj = {
        "_id": str(uuid.uuid4()),
        "username": player.get("username", email),
        "git_username": player.get("git_username", email),
        "email": player.get("email", email),
        "profile_picture": player.get("profile_picture", default_profile),
        "gameId": game,
        "message": message,
        "date": date
    }
    Helper.upsert_data(db.chats, "game_id", game, chatObj, "chat")

    if email and game and message:
        event = {"type": "message",
        "username": player.get("username", email),
        "profile_picture": player.get("profile_picture", default_profile),
        "gameId": game,
        "message": message,
        "date": date}
        notify_room(event, game)


def notify_room(event_json, game_id):
    if not event_json or not game_id:
        print("Event json or game id was null")
        return

    if "_id" not in event_json:
        event_json["_id"] = str(uuid.uuid4())

    print("Sending " + str(event_json))
    emit('gitdrnk_chat', event_json, room=game_id)

def populate_player(db, username, email):
    import requests
    player = {}
    git_request = "https://api.github.com/search/users?q="+email+"+in:email"
    r = requests.get(git_request)
    if r and len(r.json()["items"]) > 0:
        user_obj = r.json()["items"][0]
        git_username = user_obj["login"]
        git_profile_picture = user_obj["avatar_url"]
        if not username:
            player["username"] = git_username
        player["git_username"] = git_username
        player["profile_picture"] = git_profile_picture
        player["email"] = email
        Helper.create(db.players, "email", email, player)
        return player

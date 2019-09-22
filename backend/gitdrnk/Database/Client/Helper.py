seed_players = [
    {
    "username": "chuck",
    "git_username": "testa",
    "email": "chuck@email.com",
    "profile_picture":"https://i.kym-cdn.com/entries/icons/original/000/006/987/Nope.png"
    },
    {
    "username": "sammy",
    "git_username": "SamSwagGit",
    "email": "sammy@email.com",
    "profile_picture":"https://triathlon-images.imgix.net/athlete_thumbs/sam_ward_NZL.jpg?w=350&h=350&fit=facearea&facepad=2&auto=format"
    },
    {
    "username": "xxXxCryBabyxXxx",
    "git_username": "johnny",
    "email": "johnny@email.com",
    "profile_picture":"https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/15109514_377515022584270_3181286180362234311_n.png?_nc_cat=104&_nc_oc=AQlrtwl5fgYBMGgFeJKmYPWU7GuZufp3Xfj1obJVAEqVi32qjN_FPzSV8GklmlsxvLo&_nc_ht=scontent-lax3-2.xx&oh=460e1a3d2f5f3407a254c584c1206b58&oe=5DC8E722"
    },
    {
    "username": "420Kiilah69",
    "git_username": "RebeccaGit",
    "email": "rebecca@email.com",
    "profile_picture":"http://www.guitarknowledgenet.com/media_files/8c17f3ba82b594a652996209a07ccf47ac9d64e2_6.jpg"
    },
    {
    "username": "PoopyFingers",
    "git_username": "RandNum",
    "email": "poop@email.com",
    "profile_picture":"https://i.pinimg.com/564x/4c/f5/2d/4cf52de49bd0dee47cafca0d29061799.jpg"
    },
    {
    "username": "SWAG",
    "git_username": "SwG",
    "email": "swag@email.com",
    "profile_picture":"https://fbgirlshideprofile.files.wordpress.com/2015/05/1904826.jpg"
    },
    {
    "username": "InstaH0",
    "git_username": "snappers",
    "email": "snap@insta.com",
    "profile_picture":"https://fbgirlshideprofile.files.wordpress.com/2015/05/2107828.jpg"
    },
    {
    "username": "Ants",
    "git_username": "InMyEyes",
    "email": "ants@email.com",
    "profile_picture":"https://scontent-ort2-1.cdninstagram.com/vp/8a68211f84dfb5fa0f71bd3fb6b27cdb/5DF7DB33/t51.2885-15/e35/s1080x1080/67384600_341077736780599_3245993630815998883_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com"
    },
    {
    "username": "Wow",
    "git_username": "soCoolBoi",
    "email": "cool@email.com",
    "profile_picture":"https://pbs.twimg.com/profile_images/1120445334/sexy_boy_400x400.jpg"
    },
    {
    "username": "goodBoi",
    "git_username": "Snek",
    "email": "snake@email.com",
    "profile_picture":"https://pics.me.me/bayside-bayside-6-bays-bayside-6-jayside-bayside-6-bayside-61330867.png"
    }
]

seed_actions = [
    {"player_id": "chuck",
     "action": "pre-commit",
     "_id": "1",
     "date": "2019-01-01 13:05:32",
     "game_id":"huuh"},
    {"player_id": "chuck",
     "action": "pre-commit",
     "_id": "11",
     "date": "2019-01-01 13:05:32",
     "game_id":"huuh"},
    {"player_id": "chuck",
     "action": "pre-commit",
     "_id": "111",
     "date": "2019-01-01 13:05:32",
     "game_id":"huuh"},
    {"player_id": "chuck",
     "action": "pre-commit",
     "_id": "1111",
     "date": "2019-01-01 13:05:32",
     "game_id":"huuh"},
    {"player_id": "InstaH0",
     "action": "pre-commit",
     "_id": "11111",
     "date": "2019-01-01 13:05:32",
     "game_id":"huuh"},
    {"player_id": "chuck",
     "action": "pre-commit",
     "_id": "111111",
     "date": "2019-01-01 13:05:32",
     "game_id":"huuh"},
    {"player_id": "chuck",
     "action": "pre-commit",
     "_id": "1111111",
     "date": "2019-01-01 13:05:32",
     "game_id":"huuh"},
    {"player_id": "InstaH0",
     "action": "pre-commit",
     "_id": "11111111",
     "date": "2019-01-01 13:05:32",
     "game_id":"huuh"},
    {"player_id": "chuck",
     "action": "pre-commit",
     "_id": "111111111",
     "date": "2019-01-01 13:05:32",
     "game_id":"huuh"}
]

seed_games = [
    {"game_id": "gitdrnk",
    "players": ["chuck@email.com", "rebecca@email.com", "cool@email.com"]},
    {"game_id": "tmp",
    "players": ["chuck@email.com", "rebecca@email.com", "cool@email.com"]}
]

seed_rules = [
    {
        "game_id": "gitdrnk",
        "definition": [
            {
                "key": "pre-commit",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "post-commit",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "applypatch-msg",
                "rule": "Take a regular drink",
                "points": 1
            },
            {
                "key": "pre-applypatch",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "post-applypatch",
                "rule": "Take a sip",
                "points": 2
            },
            {
                "key": "prepare-commit-msg",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "commit-msg",
                "rule": "Take a sip",
                "points": 3
            },
            {
                "key": "pre-rebase",
                "rule": "Take a sip",
                "points": 5
            },
            {
                "key": "post-checkout",
                "rule": "Take a sip",
                "points": 5
            },
            {
                "key": "post-merge",
                "rule": "Take a sip",
                "points": 7
            },
            {
                "key": "pre-push",
                "rule": "Shot time!!!!",
                "points": 10
            },
            {
                "key": "pre-receive",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "update",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "post-receive",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "post-update",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "push-to-checkout",
                "rule": "Take a sip",
                "points": 5
            },
            {
                "key": "pre-auto-gc",
                "rule": "Take a sip",
                "points": 8
            },
            {
                "key": "post-rewrite",
                "rule": "Take a sip",
                "points": 10
            },
            {
                "key": "rebase",
                "rule": "Take a sip",
                "points": 10
            },
            {
                "key": "sendemail-validate",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "fsmonitor-watchman",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "p4-pre-submit",
                "rule": "Take a sip",
                "points": 1
            },
            {
                "key": "post-index-change",
                "rule": "Take a sip",
                "points": 1
            }
        ]
    },
    {
        "game_id": "tmp",
        "definition": [
            {
                "key": "pre-commit",
                "rule": "Take a sip"
            },
            {
                "key": "post-commit",
                "rule": "Take a shot"
            },
            {
                "key": "applypatch-msg",
                "rule": "Finish drink"
            },
            {
                "key": "pre-applypatch",
                "rule": "Take 2 shots"
            },
            {
                "key": "post-applypatch",
                "rule": "Take a sip"
            },
            {
                "key": "prepare-commit-msg",
                "rule": "TBD"
            },
            {
                "key": "commit-msg",
                "rule": "TBD"
            },
            {
                "key": "pre-rebase",
                "rule": "TBD"
            },
            {
                "key": "post-checkout",
                "rule": "TBD"
            },
            {
                "key": "post-merge",
                "rule": "TBD"
            },
            {
                "key": "pre-push",
                "rule": "TBD"
            },
            {
                "key": "pre-receive",
                "rule": "TBD"
            },
            {
                "key": "update",
                "rule": "TBD"
            },
            {
                "key": "post-receive",
                "rule": "TBD"
            },
            {
                "key": "post-update",
                "rule": "TBD"
            },
            {
                "key": "push-to-checkout",
                "rule": "TBD"
            },
            {
                "key": "pre-auto-gc",
                "rule": "TBD"
            },
            {
                "key": "post-rewrite",
                "rule": "TBD"
            },
            {
                "key": "rebase",
                "rule": "TBD"
            },
            {
                "key": "sendemail-validate",
                "rule": "TBD"
            },
            {
                "key": "fsmonitor-watchman",
                "rule": "TBD"
            },
            {
                "key": "p4-pre-submit",
                "rule": "TBD"
            },
            {
                "key": "post-index-change",
                "rule": "TBD"
            }
        ]
    }
]

# Create functions
def create(db, key_name, key_id, obj=None):
    key = {key_name: key_id}
    if obj != None:
        # used to create from seed
        db.update(key, obj, upsert=True)
    else:
        db.update(key, key, upsert=True)


# Read
def get_all(db):
    items = db.find()
    return list(items)

def get_by_key(db, key_name, key):
    key = {key_name: key}
    return_obj = db.find_one(key)
    if return_obj:
        print(return_obj)
        return return_obj
    else:
        return {}

def get_in_filter(db, key_list,key):
    items = db.find({key : {"$in": key_list}})
    return list(items)

# Update
def upsert_data(db,key_name, key_id, obj, dest, upsert=True):
    key = {key_name: key_id}
    collection_source = get_by_key(db, key_name, key_id)
    if not collection_source:
        db.update(key, {key_name: key_id, dest: []}, upsert=upsert)

    query = {"$addToSet": {dest: obj}}
    db.update(key, query)

def update_data(db,key_name, key_id, obj):
    key = {key_name: key_id}
    query = {"$set": obj}
    db.update_one(key, query)



def add_player_to_game(db, game_id, username):
    key = {"game_id": game_id}
    query = {"$addToSet": {"players": username}}
    db.update(key, query)

def update_ruleset(db, game_id, rules):
    key = {"game_id": game_id}
    rules["game_id"] = game_id
    db.update(key, rules, upsert=True)

# Seed functions
def seed_players_db(db):
    for player in seed_players:
        create(db, "username", player["username"], player)


def seed_games_db(db):
    for game in seed_games:
        create(db, "game_id", game["game_id"], game)


def seed_actions_db(db):
    return
    for action in seed_actions:
        add_action_message(db, "", action)


def seed_rules_db(db):
    for rule in seed_rules:
        update_ruleset(db, rule["game_id"], rule)

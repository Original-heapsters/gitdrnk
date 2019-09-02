seed_players = [
    {"username": "chuck",
     "git_username": "testa"},
    {"username": "sammy",
     "git_username": "SamSwagGit"},
    {"username": "xxXxCryBabyxXxx",
     "git_username": "johnny"},
    {"username": "420Kiilah69",
     "git_username": "RebeccaGit"},
    {"username": "PoopyFingers",
     "git_username": "RandNum"},
    {"username": "SWAG",
     "git_username": "SwG"},
    {"username": "InstaH0",
     "git_username": "snappers"},
    {"username": "Ants",
     "git_username": "InMyEyes"},
    {"username": "Wow",
     "git_username": "soCoolBoi"},
    {"username": "goodBoi",
     "git_username": "Snek"}
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
    {"game_id": "CleanGame",
     "players": ["chuck", "InstaH0", "soCoolBoi"]},
    {"game_id": "DrunkGame",
     "players": ["Ants", "goodBoi", "PoopyFingers"]},
    {"game_id": "DeathBall",
     "players": ["420Kiilah69", "InstaH0", "soCoolBoi"]},
    {"game_id": "the great equalizer",
     "players": ["xxXxCryBabyxXxx", "InstaH0", "420Kiilah69"]},
    {"game_id": "DB_Test",
     "players": ["chuck", "420Kiilah69", "soCoolBoi"]},
    {"game_id": "huuh",
      "players": ["chuck", "420Kiilah69", "soCoolBoi"]}
]

seed_rules = [
    {
        "game_id": "DeathBall",
        "definition": [
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "post-commit",
                "rule": "Drink a lot"
            }
        ]
    },
    {
        "game_id": "DrunkGame",
        "definition": [
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "post-commit",
                "rule": "Drink a lot"
            }
        ]
    },
    {
        "game_id": "CleanGame",
        "definition": [
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "post-commit",
                "rule": "Drink a lot"
            }
        ]
    },
    {
        "game_id": "the great equalizer",
        "definition": [
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "post-commit",
                "rule": "Drink a lot"
            }
        ]
    },
    {
        "game_id": "huuh",
        "definition": [
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "post-commit",
                "rule": "Drink a lot"
            }
        ]
    },
    {
        "game_id": "DB_Test",
        "definition": [
            {
                "key": "pre-commit",
                "rule": "Drink a little"
            },
            {
                "key": "post-commit",
                "rule": "Drink a lot"
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
        return []

# Update
def upsert_data(db,key_name, key_id, obj, dest):
    key = {key_name: key_id}
    collection_source = get_by_key(db, key_name, key_id)
    if not collection_source:
        db.update(key, {key_name: key_id, dest: []}, upsert=True)

    query = {"$addToSet": {dest: obj}}
    db.update(key, query)


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

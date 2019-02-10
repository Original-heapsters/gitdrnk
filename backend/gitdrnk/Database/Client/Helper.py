############### Basic CRUD ###############


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
{"player_id":"chuck",
"action":"pre-commit",
"action_id":"1",
"date":"2019-01-01 13:05:32"},
{"player_id":"chuck",
"action":"pre-commit",
"action_id":"11",
"date":"2019-01-01 13:05:32"},
{"player_id":"chuck",
"action":"pre-commit",
"action_id":"111",
"date":"2019-01-01 13:05:32"},
{"player_id":"chuck",
"action":"pre-commit",
"action_id":"1111",
"date":"2019-01-01 13:05:32"},
{"player_id":"InstaH0",
"action":"pre-commit",
"action_id":"11111",
"date":"2019-01-01 13:05:32"},
{"player_id":"chuck",
"action":"pre-commit",
"action_id":"111111",
"date":"2019-01-01 13:05:32"},
{"player_id":"chuck",
"action":"pre-commit",
"action_id":"1111111",
"date":"2019-01-01 13:05:32"},
{"player_id":"InstaH0",
"action":"pre-commit",
"action_id":"11111111",
"date":"2019-01-01 13:05:32"},
{"player_id":"chuck",
"action":"pre-commit",
"action_id":"111111111",
"date":"2019-01-01 13:05:32"}
]

seed_games = [
{"game_id":"CleanGame",
"players":["chuck","InstaH0","soCoolBoi"]},
{"game_id":"DrunkGame",
"players":["Ants","goodBoi","PoopyFingers"]},
{"game_id":"DeathBall",
"players":["420Kiilah69","InstaH0","soCoolBoi"]},
{"game_id":"the great equalizer",
"players":["xxXxCryBabyxXxx","InstaH0","420Kiilah69"]},
{"game_id":"huuh",
"players":["chuck","420Kiilah69","soCoolBoi"]}
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
}
]


def create_game(db, game_id):
    key = {"game_id": game_id}
    db.update(key, key, upsert=True)

def create_game_from_seed(db, game_id, game):
    key = {"game_id": game_id}
    db.update(key, game, upsert=True)


def get_game(db, game_id):
    key = {"game_id": game_id}
    item = db.find_one(key)
    return item


def get_games_by_id(db, game_id):
    key = {"game_id": game_id}
    items = db.find(key)
    return list(items)


def get_all_games(db):
    items = db.find()
    return list(items)


def get_chat_log(db, game_id):
    key = {"game_id": game_id}
    game_chat = db.find_one(key)
    if game_chat:
        print(game_chat)
        return game_chat["chat"]
    else:
        return []


def get_action_log(db, game_id):
    key = {"game_id": game_id}
    game_actions = db.find_one(key)
    print(game_actions["actions"])
    return game_actions["actions"]


def add_chat_message(db, game_id, chatObj):
    key = {"game_id": game_id}
    game_transcript = db.find_one(key)
    print(game_transcript)
    if not game_transcript:
        db.update(key, {"game_id": game_id, "chat":[]}, upsert=True)

    query = {"$addToSet": {"chat": chatObj}}
    db.update(key, query)

def add_action_message(db, game_id, chatObj):
    key = {"game_id": game_id}
    game_transcript = db.find_one(key)
    print(game_transcript)
    if not game_transcript:
        db.update(key, {"game_id": game_id, "actions":[]}, upsert=True)

    query = {"$addToSet": {"actions": chatObj}}
    db.update(key, query)



def add_player_to_game(db, game_id, username):
    key = {"game_id": game_id}
    query = {"$addToSet": {"players": username}}
    db.update(key, query)

def add_action(db, action):
    key = {"action_id": action["action_id"]}
    db.update(key, action, upsert=True)

def update_ruleset(db, game_id, rules):
    key = {"game_id": game_id}
    rules["game_id"] = game_id
    db.update(key, rules, upsert=True)

def create_player(db, username, user):
    key = {"username": username}
    db.update(key, user, upsert=True)


def get_player(self):
    pass


def get_player_by_username(db, username):
    key = {"username": username}
    item = db.find_one(key)
    return item


def get_players_by_username(db, username):
    key = {"username": username}
    items = db.find(key)
    return list(items)

def get_actions_by_username(db, username):
    key = {"player_id": username}
    items = db.find(key)
    return list(items)

def get_player_by_git_username(db, username):
    key = {"git_username": username}
    item = db.find_one(key)
    return item

def get_rules_for_game(db, game_id):
    key = {"game_id": game_id}
    item = db.find_one(key)
    return item


def get_all_players(db):
    items = db.find()
    return list(items)

def get_all_actions(db):
    items = db.find()
    return list(items)

def get_all_rules(db):
    items = db.find()
    return list(items)

def seed_players_db(db):
    for player in seed_players:
        create_player(db, player["username"], player)

def seed_games_db(db):
    for game in seed_games:
        create_game_from_seed(db, game["game_id"], game)

def seed_actions_db(db):
    for action in seed_actions:
        add_action(db, action)

def seed_rules_db(db):
    for rule in seed_rules:
        update_ruleset(db, rule["game_id"], rule)



def update_player(self):
    pass


def create_action(self):
    pass


def get_action(self):
    pass


def update_action(self):
    pass
############### Basic CRUD ###############

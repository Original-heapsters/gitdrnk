############### Basic CRUD ###############


def create_game(db, game_id):
    key = {"game_id": game_id}
    db.update(key, key, upsert=True)


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


def add_player_to_game(db, game_id, username):
    key = {"game_id": game_id}
    query = {"$addToSet": {"players": username}}
    db.update(key, query)

def add_action(db, action):
    key = {"action_id": action["action_id"]}
    db.update(key, action, upsert=True)

def update_ruleset(db, game_id, rules):
    key = {"game_id": game_id}
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


def update_player(self):
    pass


def create_action(self):
    pass


def get_action(self):
    pass


def update_action(self):
    pass

############### Basic CRUD ###############

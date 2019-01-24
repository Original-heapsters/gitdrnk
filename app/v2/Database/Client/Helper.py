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


def update_game(self):
    pass


def create_player(db, username):
    key = {"username": username}
    db.update(key, key, upsert=True)


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


def get_all_players(db):
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
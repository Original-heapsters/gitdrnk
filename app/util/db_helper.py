from tinydb import TinyDB, Query
from models import game, player


def get_game(id=None, db=None):
    Game = Query()
    if id:
        result = db.search(Game.id == id)
        if len(result) > 0:
            found_game = game.from_json(result[0])
            return found_game
    return None

def get_player(name=None, db=None):
    Player = Query()
    if name:
        result = db.search(Player.name == name)
        if len(result) > 0:
            found_player = player.from_json(result[0])
            return found_player
    return None

def add_player(player_obj=None, db=None):
    if player_obj and db:
        db.insert(player_obj.__dict__)

def add_player_to_game(player_obj=None, game_id=None, db=None):
    if player_obj and game_id and db:
        print('__________')
        print(player_obj)
        game = get_game(game_id, db)
        if game:
            if game.players and player_obj not in game.players:
                print('1')
                print(game)
                game.players.append(player_obj)
            elif not game.players:
                print('2')
                game.players = [player_obj.__dict__]
            else:
                print('3')
                return
            Game = Query()
            db.update({'players': game.players}, Game.id == game_id)

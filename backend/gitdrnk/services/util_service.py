import urllib
from flask import url_for
from Database.Client import Helper

def nuke(db):
    db.players.remove()
    db.games.remove()
    db.actions.remove()
    db.rules.remove()
    db.chats.remove()

    response = {"ok": True, "message": "All databases cleared"}
    code = 200
    return response, code

def seed_db(db):
    Helper.seed_players_db(db.players)
    Helper.seed_games_db(db.games)
    Helper.seed_actions_db(db.actions)
    Helper.seed_rules_db(db.rules)

    response = {"ok": True, "message": "All databases seeded"}
    code = 200
    return response, code

def get_sitemap(url_map):
    code = 200
    resp = []
    for rule in url_map.iter_rules():
        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        methods = ','.join(rule.methods)
        url = url_for(rule.endpoint, **options)
        line = urllib.parse.unquote("{:25s} {:25s} {}".format(rule.endpoint, methods, url))
        resp.append(line)

    return resp, code

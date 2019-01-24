import json
class game(object):
    def __init__(self, user_id='', title=''):
        self.user_id = user_id
        self.title = title
        self.host = None
        self.repo = None
        self.players = []
        print('Initialized Game')

    def __init__(self, user_id='', title='', host='', repo='', players=[]):
        self.user_id = user_id
        self.title = title
        self.host = host
        self.repo = repo
        self.players = players
        print('Initialized Game')

    def __repr__(self):
        return {
        'user_id': self.user_id,
        'title': self.title,
        'host': self.host,
        'repo': self.repo,
        'players': self.players
        }

def from_document(json):
    return game(json['user_id'], json['title'], json['host'], json['repo'], json['players'])

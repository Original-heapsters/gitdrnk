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
        output = 'GAME:'
        output += '\nUSERID: ' + str(self.user_id)
        output += '\nTITLE: ' + str(self.title)
        output += '\nHOST: ' + str(self.host)
        output += '\nREPO: ' + str(self.repo)
        output += '\nPLAYERS:'
        for player in self.players:
            output += '\n\t' + str(player.name)
        return output

def from_json(json):
    return game(json['user_id'], json['title'], json['host'], json['repo'], json['players'])

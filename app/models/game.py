import json
class game(object):
    def __init__(self, id="", title=""):
        self.id = id
        self.title = title
        self.host = None
        self.repo = None
        self.players = []
        print('Initialized Game')

    def __init__(self, id="", title="", host="", repo="", players=[]):
        self.id = id
        self.title = title
        self.host = host
        self.repo = repo
        self.players = players
        print('Initialized Game')

    def __repr__(self):
        output = 'ID: ' + str(self.id[:6])
        output += '\nTITLE: ' + str(self.title)
        output += '\nHOST: ' + str(self.host)
        output += '\nREPO: ' + str(self.repo)
        output += '\nPLAYERS:'
        for player in self.players:
            output += '\n\t' + str(player.name)
        return output

def from_json(json):
    return game(json['id'], json['title'], json['host'], json['repo'], json['players'])

class player(object):

    def __init__(self, name='', activity=[]):
        self.name = name
        self.activity = activity
        print('Initialized Player')

    def __repr__(self):
        output = 'Player Name: ' + self.name
        output += '\nActivity: '
        for activity in self.activity:
            output += '\n\t' + activity
        return output

def from_json(json):
    return player(json['name'], json['activity'])

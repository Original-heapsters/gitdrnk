class Player(object):

    def __init__(self, name):
        self.name = name
        print('Initialized Player')

    def __repr__(self):
        return 'Player Name: ' + self.name
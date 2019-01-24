import json

class player(object):

    def __init__(self, name='', activity=[]):
        self.name = name
        self.activity = activity
        print('Initialized Player')

    def __repr__(self):
        return {
        'name': self.name,
        'activity': self.activity
        }

def from_document(json):
    return player(json['name'], json['activity'])

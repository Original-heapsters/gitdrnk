import os
import random
import glob
import pyglet
from flask import Flask,render_template
from flask import request

app = Flask(__name__)
staticDir = './static/'
playAudioCmd = 'mpg123 '

@app.route('/')
@app.route('/index')
def index():
    playAnAudioFile()
    return render_template('index.html')

@app.route('/rules', methods=['GET'])
def rules():
    audio = staticDir + 'gang.mp3'
    os.system(playAudioCmd + audio)
    return render_template('rules.html')

@app.route('/precommit')
def precommit():
    audio = staticDir + 'mlg.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

@app.route('/precommitmsg')
def precommitmsg():
    audio = staticDir + 'moo.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

@app.route('/commitmsg')
def commitmsg():
    audio = staticDir + 'wreck.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

@app.route('/postcommit')
def postcommit():
    audio = staticDir + 'dale.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

@app.route('/postrewrite')
def postrewrite():
    audio = staticDir + 'dale.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

@app.route('/postcheckout')
def postcheckout():
    audio = staticDir + 'dale.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

@app.route('/postmerge')
def postmerge():
    audio = staticDir + 'dale.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

@app.route('/prepush')
def prepush():
    audio = staticDir + 'dale.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

@app.route('/postrecieve')
def postrecieve():
    audio = staticDir + 'dale.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

@app.route('/board')
def board():
    audio = staticDir + 'dale.mp3'
    os.system(playAudioCmd + audio)
    return render_template('board.html')

def playAnAudioFile():
    files = []
    for file in os.listdir(staticDir):
        if file.endswith(".mp3"):
            path = os.path.join(staticDir, file)
            files.append(path)
    os.system(playAudioCmd + random.choice(files) + ' &')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8181)

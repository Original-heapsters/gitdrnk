import os
import random
import glob
import pyglet
from time import gmtime, strftime
from flask import Flask,render_template, url_for
from flask import request

app = Flask(__name__)
staticDir = './static/'
userInfo = {}
logFileDir = staticDir + 'logs/'
logFile = logFileDir + 'gametime.txt'
playAudioCmd = 'mpg123 '
officialRules = {
'precommit' : 'Everyone drinks!',
'precommitmsg' : 'Take a sip',
'commitmsg' : 'Take 3 sips',
'postcommit' : 'Take a really small sip',
'postrewrite' : 'Chug to your hearts content',
'postcheckout' : 'Do some sorta exercise OR drink 1/4 of what you have',
'postmerge' : 'Take a really big sip',
'prepush' : 'Drink for how long your push took',
'postrecieve' : 'Drink like a fancy person'
}


os.system('mkdir -p ' + logFileDir + ' && touch '+ logFile)

@app.route('/')
@app.route('/index')
def index():
    scriptLocation = url_for('static', filename='installScript.sh')
    return render_template('index.html', installScript=scriptLocation)

@app.route('/rules', methods=['GET'])
def rules():
    return render_template('rules.html', rulesDefinition=officialRules)

@app.route('/board')
def board():
    content = []
    for line in reversed(open(logFile).readlines()):
        content.append(line)
    return render_template('board.html', logContents=content)

@app.route('/restart')
def restart():
    open(logFile, 'w').close()
    return render_template('index.html')

@app.route('/pull')
def pull():
    os.system('git pull origin master')
    return render_template('index.html')


@app.route('/precommit/<offender>')
def precommit(offender):
    playAnAudioFile()
    writeOffense(offender=offender, offense='precommit')
    return 'OK'

@app.route('/precommitmsg/<offender>')
def precommitmsg(offender):
    playAnAudioFile()
    writeOffense(offender=offender, offense='precommitmsg')
    return 'OK'

@app.route('/commitmsg/<offender>')
def commitmsg(offender):
    playAnAudioFile()
    writeOffense(offender=offender, offense='commitmsg')
    return 'OK'

@app.route('/postcommit/<offender>')
def postcommit(offender):
    playAnAudioFile()
    writeOffense(offender=offender, offense='postcommit')
    return 'OK'

@app.route('/postrewrite/<offender>')
def postrewrite(offender):
    playAnAudioFile()
    writeOffense(offender=offender, offense='postrewrite')
    return 'OK'

@app.route('/postcheckout/<offender>')
def postcheckout(offender):
    playAnAudioFile()
    writeOffense(offender=offender, offense='postcheckout')
    return 'OK'

@app.route('/postmerge/<offender>')
def postmerge(offender):
    playAnAudioFile()
    writeOffense(offender=offender, offense='postmerge')
    return 'OK'

@app.route('/prepush/<offender>')
def prepush(offender):
    playAnAudioFile()
    writeOffense(offender=offender, offense='prepush')
    return 'OK'

@app.route('/postrecieve/<offender>')
def postrecieve(offender):
    playAnAudioFile()
    writeOffense(offender=offender, offense='postrecieve')
    return 'OK'

def writeOffense(offender = None, offense = None):
    with open(logFile, 'a') as fo:
        line = offender + ' just did a ' + offense
        line += ' at ' + strftime("%Y-%m-%d %H:%M:%S", gmtime())
        line += '\n'
        fo.write(line)
        punishment = '\t' + officialRules[offense] + '\n'
        fo.write(punishment)
        fo.close()

def playAnAudioFile():
    files = []
    for file in os.listdir(staticDir):
        if file.endswith(".mp3"):
            path = os.path.join(staticDir, file)
            files.append(path)
    os.system(playAudioCmd + random.choice(files) + ' &')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8181)

import os
import glob
from flask import Flask,render_template
from flask import request

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/rules', methods=['GET'])
def rules():
    return render_template('rules.html')

@app.route('/precommit')
def precommit():
    return render_template('board.html')

@app.route('/precommitmsg')
def precommitmsg():
    return render_template('board.html')

@app.route('/commitmsg')
def commitmsg():
    return render_template('board.html')

@app.route('/postcommit')
def postcommit():
    return render_template('board.html')

@app.route('/postrewrite')
def postrewrite():
    return render_template('board.html')

@app.route('/postcheckout')
def postcheckout():
    return render_template('board.html')

@app.route('/postmerge')
def postmerge():
    return render_template('board.html')

@app.route('/prepush')
def prepush():
    return render_template('board.html')

@app.route('/postrecieve')
def postrecieve():
    return render_template('board.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8181)

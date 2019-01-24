import sys
import os
# Add app and configuration module to path
app_dir = os.path.dirname(os.path.abspath(__file__))
configuration_dir = os.path.join(app_dir, 'configuration')
util_dir = os.path.join(app_dir, 'util')

if configuration_dir not in sys.path:
    sys.path.insert(0, configuration_dir)
if util_dir not in sys.path:
    sys.path.insert(0, util_dir)
if app_dir not in sys.path:
    sys.path.insert(0, app_dir)

import json
from bson import json_util
import uuid
import random
import tempfile

from flask_pymongo import PyMongo

from v1.configuration.rules import rule_sets
from v1.util.user_info import get_current_os_user
import vlc
from time import gmtime, strftime
from flask import Flask, render_template, url_for, flash, request, redirect, send_file, after_this_request
from werkzeug.utils import secure_filename
from v1.models import player, game

gitdrnk = Flask(__name__)

@gitdrnk.route('/health_check')
def health_check():
    return json.dumps({200: 'OK'})


@gitdrnk.route('/game/create', methods=['POST'])
def create_game():
    user_id = request.form.get('user_id', default=None)
    if not user_id: user_id = uuid.uuid4().hex

    title = request.form.get('title', default=None)
    if title:
        new_game = game.game(user_id=user_id, title=title)
        key = {'user_id':user_id}
        mongo.db.games.update(key, new_game.__dict__, upsert=True)
        return json.dumps(new_game.__dict__, default=json_util.default)
    return json.dumps({501: 'Game not created!'})

@gitdrnk.route('/game/join', methods=['POST'])
def join_game():
    user_id = request.form.get('user_id', default=None)
    playerName = request.form.get('name', default=None)
    if id and playerName:
        found_game = game.from_document(mongo.db.games.find_one({'user_id': user_id}))
        found_player = player.from_document(mongo.db.players.find_one({'name': playerName}))
        if found_game.players:
            names = [name['name'] for name in found_game.players]
            if found_player.name not in names:
                found_game.players.append(found_player.__dict__)
        else:
            found_game.players = [found_player.__dict__]
        key = {'user_id': user_id}
        mongo.db.games.update(key, found_game.__dict__)
        return json.dumps(found_game.__dict__, default=json_util.default)
    return json.dumps({501: 'Game not joined!'})

@gitdrnk.route('/game/all', methods=['GET'])
def all_games():
    game_cursor = mongo.db.games.find()
    games = []
    for doc in game_cursor:
        tmp = game.from_document(doc)
        print(tmp)
        games.append(tmp.__dict__)
    return json.dumps(games)


@gitdrnk.route('/game/activity')
def game_activity():
    return json.dumps({200: 'GAME_LOG'})

@gitdrnk.route('/player/activity')
def player_activity():
    return json.dumps({200: 'PLAYER_LOG'})

@gitdrnk.route('/player/all')
def all_players():
    player_cursor = mongo.db.players.find()
    players = []
    for doc in player_cursor:
        players.append(doc)
    return json.dumps(players, default=json_util.default)


@gitdrnk.route('/player', methods=['GET', 'POST'])
def player_config():
    if request.method == 'GET':
        name = request.args.get('username', default=None)
        key = {'name': name}
        found_player = player.from_document(mongo.db.players.find_one(key))
        return json.dumps(found_player, default=json_util.default)
    else:
        name = request.form.get('username', default=None)
        new_player = player.player(name=name)
        key = {'name': name}
        mongo.db.players.update(key, new_player.__dict__, upsert=True)
        return json.dumps(new_player.__dict__, default=json_util.default)

@gitdrnk.route('/rules', methods=['GET', 'POST'])
def rule_definitions():
    if request.method == 'GET':
        return json.dumps({200: 'VIEW_RULES'})
    else:
        return json.dumps({200: 'EDIT_RULES'})




@gitdrnk.route('/info')
def info():
    server_info = {'version': '0.01',
                   'rules': gitdrnk.config['RULE_SET'],
                   'log_file': gitdrnk.config['LOG_FILE'],
                   'audio_count': len(os.listdir(gitdrnk.config['AUDIO_DIR'])),
                   'result': {200: 'OK'}}
    return json.dumps(server_info)


@gitdrnk.route('/')
@gitdrnk.route('/index')
def index():
    script_location = url_for('static', filename='installScript.sh')
    username = get_current_os_user()
    return render_template('index.html', installScript=script_location, username=username)


@gitdrnk.route('/install', methods=['POST'])
def install():
    host = request.remote_addr
    print(host)
    provided_username = request.form.get('username')
    if provided_username:
        username = provided_username
    else:
        username = get_current_os_user()
    platform = request.user_agent.platform
    install_script, path_to_delete = configure_install_script(host, username, platform)

    @after_this_request
    def remove_file(response):
        os.remove(path_to_delete)
        return response

    return send_file(path_to_delete)

@gitdrnk.route('/install_instructions')
def install_instructions():
    return render_template('install_help.html')


@gitdrnk.route('/rules', methods=['GET'])
def rules():
    return render_template('rules.html', rulesDefinition=gitdrnk.config["RULE_SET"])


@gitdrnk.route('/board')
def board():
    content = []
    for line in reversed(open(gitdrnk.config['LOG_FILE']).readlines()):
        content.append(line)
    return render_template('board.html', logContents=content)


@gitdrnk.route('/restart')
def restart():
    play_audio_file()
    open(gitdrnk.config['LOG_FILE'], 'w').close()
    return render_template('index.html')


@gitdrnk.route('/pull')
def pull():
    os.system('git pull origin master')
    return render_template('index.html')


@gitdrnk.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # check if the post request has the file part
        uploaded_files = request.files.getlist("files[]")
        for file in uploaded_files:
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(gitdrnk.config['AUDIO_DIR'], filename))
        return render_template('upload.html')
    else:
        return render_template('upload.html')


@gitdrnk.route('/violation', methods=['GET'])
def violation():
    offense = request.args.get('offense')
    offender = request.args.get('user')

    play_audio_file()

    return write_offense(offender, offense)


def write_offense(offender=None, offense=None):
    violation = {}
    with open(gitdrnk.config['LOG_FILE'], 'a') as fo:
        violation['who'] = offender
        violation['what'] = offense
        violation['when'] = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        violation['punishment'] = gitdrnk.config["RULE_SET"][offense]
        line = '\n' + offender + ' --> ' + offense + ' | ' + strftime("%Y-%m-%d %H:%M:%S", gmtime())
        punishment = '\t' + gitdrnk.config["RULE_SET"][offense]

        fo.writelines([line, punishment])
        fo.close()


        return json.dumps(violation, indent=4)


def play_audio_file():
    file = random.choice(os.listdir(gitdrnk.config['AUDIO_DIR']))
    path = os.path.join(gitdrnk.config['AUDIO_DIR'], file)
    vlc.MediaPlayer(path).play()


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in gitdrnk.config['ALLOWED_EXTENSIONS']


def configure_install_script(host, user, platform):
    output_script, path = tempfile.mkstemp()
    with open(output_script, 'w') as install_script:
        installer_lines = []
        installer_lines.append('HOST=\"' + host + ':' + gitdrnk.config["PORT"] + '\"\n')
        installer_lines.append('USERNAME=\"' + user + '\"\n')
        for offense, _ in gitdrnk.config['RULE_SET'].items():
            if platform == 'windows':
                installer_lines.append(
                    'echo \"# !C:/Program\ Files/Git/usr/bin/sh.exe\" > .git/hooks/' + offense + '\n')
            else:
                installer_lines.append('echo \"#!/bin/sh\" > .git/hooks/' + offense + '\n')

            installer_lines.append(
                'echo \"curl \\\"$HOST/violation?user=$USERNAME&offense=' + offense + '\\\"\" >> .git/hooks/' + offense + '\n')

        if platform != 'windows':
            installer_lines.append('sudo chmod +x .git/hooks/*\n')

        install_script.writelines(installer_lines)
        install_script.close()

    return output_script, path


def setup():
    working_dir = os.path.dirname(os.path.abspath(__file__))
    if working_dir not in sys.path:
        sys.path.insert(0, working_dir)
    print (sys.path)
    config_file = os.path.join(working_dir, os.path.join('configuration', 'default.json'))

    with open(config_file, 'r') as config_file:
        configuration = json.load(config_file)
        rule_set = configuration['rule_set']
        official_rules = rule_sets[rule_set]
        host = configuration['host']
        port = configuration['port']
        db = configuration['mongo_uri']

    allowed_extensions = {'mp3'}
    audio_dir = os.path.join(working_dir, os.path.join('static', 'assets'))
    log_dir = os.path.join(working_dir, os.path.join('static', 'logs'))
    log_file = os.path.join(log_dir, 'game_time.txt')

    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
    if not os.path.exists(log_file):
        open(log_file, 'w').close()

    gitdrnk.config["RULE_SET"] = official_rules
    gitdrnk.config["LOG_FILE"] = log_file
    gitdrnk.config["AUDIO_DIR"] = audio_dir
    gitdrnk.config["ALLOWED_EXTENSIONS"] = allowed_extensions
    gitdrnk.config["HOST"] = host
    gitdrnk.config["PORT"] = port
    gitdrnk.config["MONGO_URI"] = db


setup()
mongo = PyMongo(gitdrnk)
mongo.db.players.remove()
mongo.db.games.remove()

if __name__ == '__main__':
    setup()
    gitdrnk.run(debug=True, host=gitdrnk.config["HOST"], port=int(gitdrnk.config["PORT"]))

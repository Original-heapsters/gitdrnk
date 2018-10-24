import os
import json
import random
import vlc
from rules import rule_sets
from time import gmtime, strftime
from flask import Flask,render_template, url_for, flash, request, redirect, send_file
from werkzeug.utils import secure_filename

gitdrnk = Flask(__name__)


@gitdrnk.route('/')
@gitdrnk.route('/index')
def index():
    script_location = url_for('static', filename='installScript.sh')
    return render_template('index.html', installScript=script_location)


@gitdrnk.route('/install')
def install():
    host = request.remote_addr
    print(host)
    user_home = os.path.expanduser('~')
    provided_username = request.args.get('username')
    if provided_username:
        username = provided_username
    else:
        username = os.path.split(user_home)[-1]
    platform = request.user_agent.platform
    install_script = configure_install_script(host, username, platform)
    return send_file(install_script)

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
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(gitdrnk.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('upload', filename=filename))
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
    with open(gitdrnk.config['LOG_FILE'], 'a') as fo:
        line = offender + ' --> ' + offense + ' | ' + strftime("%Y-%m-%d %H:%M:%S", gmtime())
        punishment = '\t' + gitdrnk.config["RULE_SET"][offense]

        fo.writelines([line, punishment])
        fo.close()
        return punishment


def play_audio_file():
    file = random.choice(os.listdir(gitdrnk.config['AUDIO_DIR']))
    path = os.path.join(gitdrnk.config['AUDIO_DIR'], file)
    vlc.MediaPlayer(path).play()


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in gitdrnk.config['ALLOWED_EXTENSIONS']


def configure_install_script(host, user, platform):
    output_script = 'tmp.sh'
    with open(output_script, 'w') as install_script:
        installer_lines = []
        installer_lines.append('HOST=\"' + host + '\"\n')
        installer_lines.append('USERNAME=\"' + user + '\"\n')
        for offense, _ in gitdrnk.config['RULE_SET'].items():
            if platform == 'windows':
                installer_lines.append('echo \"# !C:/Program\ Files/Git/usr/bin/sh.exe\" > .git/hooks/' + offense + '\n')
            else:
                installer_lines.append('echo \"#!/bin/sh\" > .git/hooks/' + offense + '\n')

            installer_lines.append('echo \"curl $HOST/violation?user=$USERNAME&offense=' + offense + '\" >> .git/hooks/' + offense + '\n')

        if platform != 'windows':
            installer_lines.append('sudo chmod +x .git/hooks/*\n')

        install_script.writelines(installer_lines)
        install_script.close()

    return output_script


def setup():
    config_file = 'default.json'

    with open(config_file, 'r') as config_file:
        configuration = json.load(config_file)
        rule_set = configuration['rule_set']
        official_rules = rule_sets[rule_set]
        host = configuration['host']
        port = configuration['port']

    upload_folder = 'static'
    allowed_extensions = {'mp3'}
    audio_dir = os.path.join('static', 'assets')
    installer = os.path.join('static', 'installScript.sh')
    log_file_dir = os.path.join('static', 'logs')
    log_file = os.path.join(log_file_dir, 'game_time.txt')

    open(log_file, 'w').close()

    gitdrnk.config["RULE_SET"] = official_rules
    gitdrnk.config["LOG_DIR"] = log_file_dir
    gitdrnk.config["LOG_FILE"] = log_file
    gitdrnk.config["INSTALLER"] = installer
    gitdrnk.config["AUDIO_DIR"] = audio_dir
    gitdrnk.config['UPLOAD_FOLDER'] = upload_folder
    gitdrnk.config["ALLOWED_EXTENSIONS"] = allowed_extensions
    gitdrnk.config["HOST"] = host
    gitdrnk.config["PORT"] = port


if __name__ == '__main__':
    setup()
    gitdrnk.run(debug=True, host=gitdrnk.config["HOST"], port=int(gitdrnk.config["PORT"]))


import os

def get_current_os_user():
    user_home = os.path.expanduser('~')
    username = os.path.split(user_home)[-1]
    return username

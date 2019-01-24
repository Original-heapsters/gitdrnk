from v1.gitdrnk import gitdrnk

def create_app():
    gitdrnk.setup()
    return gitdrnk


if __name__ == '__main__':
    gitdrnk.setup()
    gitdrnk.run()
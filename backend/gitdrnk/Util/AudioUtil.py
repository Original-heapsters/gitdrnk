import os, random

def get_random_audio_path(path_to_audio_assets):
    return random.choice(os.listdir(path_to_audio_assets))
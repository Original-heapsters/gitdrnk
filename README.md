# gitdrnk [![Build Status](https://travis-ci.org/Original-heapsters/gitdrnk.svg?branch=master)](https://travis-ci.org/Original-heapsters/gitdrnk)
[Website](https://gitdrnk-frontend.herokuapp.com/)  
[Proposed UI and architecture overview](https://marvelapp.com/4dadagd)  


# Vocabulary
| Term   | Defition                                 | Notes                                                                                                                                                |
|--------|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Game   | Game and chatroom associated with a repo | The Game must be the same name of the repo                                                                                                           |
| Action | Any git-related action                   | Git related actions are actions that have a corresponding [git hook](https://git-scm.com/docs/githooks) These will be triggered from the client side |

# How to play
  1. Enter your github email
  2. Select the game you want to join
    * Games must be the same name as the github repo you wish to connect
  3. Join!
  4. Setup your connected repo

# Repo setup
After joining, you will need to place the right hook scripts into your repos `.git/hooks` folder
  * i.e. If my game repo is called [tmp](https://github.com/Original-heapsters/tmp) I will extract my hook scripts into `path/to/repo/.git/hooks`
Once the script files are in the `hooks` directory, they need to be made executable
  * On Linux/Mac, run the following `chmod +x /path/to/repo/.git/hooks/*`


## Running Locally

### Backend
  * Start the mongo db from docker with ```docker run -d -p 27017:27017 mongo```
  * Source a virtual environment with the appropriate packages installed with ```source /path/to environment/bin/activate```
    * You can create a venv with ```virtualenv -p python3 /path/to/env```
    * You can install the required packages **After sourcing the virtual environment** with ```pip install -r requirements.txt```
      * requirements.txt is in the ```repo/backend/gitdrnk``` folder
  * Optionally export the DB Environment variable with ```export DB=mongodb://localhost:27017/gitdrnk```
  * Run the backend with ```python gitdrnk.py```
  * To start fresh with a seeded database, visit the [seed_db](http://localhost:5000/seed_db) endpoint
  * To clear the database, visit the [nukeeverything](http://localhost:5000/nukeeverything) endpoint

### Frontend
  * Optionally export the `REACT_APP_GITDRNK_SVC` environment variable to point to the backend server with ```export REACT_APP_GITDRNK_SVC=http://localhost:5000```
    * It will default to localhost
  * ```npm install```
  * ```npm start```

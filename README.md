# gitdrnk
[Proposed UI and architecture overview](https://marvelapp.com/4dadagd)

## Running Locally

### Backend
  * Start the mongo db from docker with ```docker run -d -p 27017:27017 mongo```
  * Source a virtual environment with the appropriate packages installed with ```source /path/to environment/bin/activate```
    * You can create a venv with ```virtualenv -p python3 /path/to/env```
    * You can install the required packages **After sourcing the virtual environment** with ```pip install -r requirements.txt```
      * requirements.txt is in the ```repo/backend/gitdrnk``` folder
  * Export the DB Environment variable with ```export DB=mongodb://localhost:27017/gitdrnk```
  * Run the backend with ```python gitdrnk.py```
  * To start fresh with a seeded database, visit the [seed_db](http://localhost:5000/seed_db) endpoint
  
### Frontend
  * Export the `REACT_APP_GITDRNK_SVC` environment variable to point to the backend server with ```export REACT_APP_GITDRNK_SVC=http://localhost:5000```
  * ```npm install```
  * ```npm start```
  
const apiEndpoint = process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000";

function getPlayers(cb){
  const playerEndpoint = apiEndpoint + '/players/all';
  fetch(playerEndpoint)
    .then(response => response.json())
    .then(players => cb(null, players.players));
}

function getGames(cb){
  const allGamesEndpoint = apiEndpoint + '/games/all';
  fetch(allGamesEndpoint)
  .then(response => response.json())
  .then(games => cb(null, games.games));
}

function getChatLog(gameId, cb){
  // Get previous messages
  const chatLogEndpoint = apiEndpoint + '/game/chat?game_id=' + gameId;
  fetch(chatLogEndpoint)
    .then(response => response.json())
    .then(chat => cb( null, chat.transcript));

  // Join the chat
  // joinChat(this.state.gameId, this.state.playerUsername, (err, message ) => this.setState({ messages: this.state.messages.concat(message)}));
}

function getActionLog(gameId, cb){
  // Get previous messages
  const actionLogEndpoint = apiEndpoint + '/actions/action_log?game_id=' + gameId;
  fetch(actionLogEndpoint)
    .then(response => response.json())
    .then(actions => cb( null, actions.action_log));
}

function getRules(gameId, cb){
  const ruleEndpoint = apiEndpoint + '/game/rules?game_id=' + gameId;
  fetch(ruleEndpoint)
    .then(response => response.json())
    .then(rules => cb( null, rules.rules.definition));
}

function nukeDB(){
  const nukeEndpoint = apiEndpoint + '/nukeeverything';
  fetch(nukeEndpoint)
    .then(response => response.json())
}

function seedDB(){
  const seedEndpoint = apiEndpoint + '/seed_db';
  fetch(seedEndpoint)
    .then(response => response.json())
}

export { getPlayers, getChatLog, getRules, getGames, getActionLog, nukeDB, seedDB }

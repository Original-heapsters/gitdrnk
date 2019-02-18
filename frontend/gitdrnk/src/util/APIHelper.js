const apiEndpoint = process.env.REACT_APP_GITDRNK_SVC;

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

function getRules(gameId, cb){
  const ruleEndpoint = apiEndpoint + '/game/rules?game_id=' + gameId;
  fetch(ruleEndpoint)
    .then(response => response.json())
    .then(rules => cb( null, rules.rules.definition));
}

export { getPlayers, getChatLog, getRules, getGames }

const apiEndpoint = process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000";

function getGitInfo(gitEmail, cb){
  const loginEndpoint = apiEndpoint + '/login';
  const params = {
    email: gitEmail.toLowerCase()
  };
  fetch(loginEndpoint,{
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)})
      .then(response => response.json())
      .then(player => cb(player))
      .catch(err => console.error(err));
}

function getPlayers(cb){
  const playerEndpoint = apiEndpoint + '/players/all';
  fetch(playerEndpoint)
    .then(response => response.json())
    .then(players => cb(null, players.players));
}

function getPlayersByGame(gameId,cb){
  var playersByGameIdEndpoint = new URL(apiEndpoint + '/players'),
      params = {game_id:gameId}
  console.log(playersByGameIdEndpoint)
  Object.keys(params).forEach(key => playersByGameIdEndpoint.searchParams.append(key, params[key]))
  fetch(playersByGameIdEndpoint)
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
  var chatLogEndpoint = new URL(apiEndpoint + '/game/chat'),
      params = {game_id:gameId}
  console.log(chatLogEndpoint)
  Object.keys(params).forEach(key => chatLogEndpoint.searchParams.append(key, params[key]))
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

function updateAction(gameId, actionId){
  const actionLogEndpoint = apiEndpoint + '/actions/complete';
  const params = {
    game_id: gameId,
    action_id: actionId
  };
  console.log(params);
  fetch(actionLogEndpoint,{
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)})
      .catch(err => console.error(err));

}

function getRules(gameId, cb){
  const ruleEndpoint = apiEndpoint + '/game/rules?game_id=' + gameId;
  fetch(ruleEndpoint)
    .then(response => response.json())
    .then(rules => cb( null, rules.rules.definition));
}

function getClientScripts(ref, game_id, cb){
  const clientOS = getOS();
  const scriptsEndpoint = `${apiEndpoint}/help/client_hooks/${game_id}/${clientOS}`;
  fetch(scriptsEndpoint)
    .then(res => {
        return res.blob();
    }).then(blob => {
      // Super hack to trigger a file download
        const href = window.URL.createObjectURL(blob);
        const a = ref;
        a.download = 'GitHookScripts.zip';
        a.href = href;
        a.click();
        a.href = '';
    }).catch(err => console.error(err));
}

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'unix';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'unix';
  }

  return os;
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

export {getGitInfo, getPlayers, getPlayersByGame, getChatLog, getRules, getGames, getActionLog, updateAction, getClientScripts, nukeDB, seedDB }

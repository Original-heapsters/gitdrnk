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

export { getPlayers, getChatLog, getRules, getGames, getActionLog, getClientScripts }

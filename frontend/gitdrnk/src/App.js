import React, { Component } from 'react';
import update from 'immutability-helper';
import './App.css';
import Rules from './components/Rules';
import Chat from './components/Chat';
import Header from './components/Header/Header.js';
import PlayerList from './components/PlayerList';
import { getPlayersByGame, getGames, getChatLog, getActionLog, getRules, nukeDB, seedDB} from './util/APIHelper';
import { joinChat, leaveChat } from './SocketAPI.js';

class App extends Component {
  constructor(props) {
    super(props);
    var sessionInfo = {
      gameId: "",
      email:""
    }
    this.state = {
      server: process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000",
      session: sessionInfo,
      players: [],
      chat: [],
      actions:[],
      rules: [],
      games: []
    }
    this.updateSession = this.updateSession.bind(this);
    this.handleNewChat = this.handleNewChat.bind(this);
    this.handleNewAction = this.handleNewAction.bind(this);
    this.handleActionUpdate = this.handleActionUpdate.bind(this);
    this.changeGame = this.changeGame.bind(this);

  }

  componentDidMount(){
    getGames((err, gameList)=> {
      let initialGame = "";
      if (gameList && gameList.length > 0){
        initialGame = gameList[0].game_id
      }
      let init_games = {
        gameId: initialGame,
        email: this.state.session.email,
      };
      this.setState({
        session: init_games,
        games: gameList
      });
    });
  }

  handleNewChat(err, message) {
    console.log(message)
    if (message.type === "join" && message.email === this.state.session.email){
      getPlayersByGame(message.gameId, (err, playerList)=> {
        this.setState({players: playerList})
      });
    }
    this.setState({ chat: this.state.chat.concat(message)});
  }

  handleNewAction(err, action) {
    if (action.game_id !== this.state.session.gameId){
      return;
    }
    let actionList = this.state.actions.concat(action)
                      .map(action => {
                        const existingAudio = action.audio || ""
                        const audioTarget = this.state.server + "/" + existingAudio;
                        if (!existingAudio.startsWith(this.state.server)){
                          action.audio = audioTarget;
                        }
                        return action
                      });

    this.setState({ actions: actionList});
    var audio = new Audio(action.audio);
    audio.play();
  }

  handleActionUpdate(err, action){
    const existingAudio = action.audio || ""
    const audioTarget = this.state.server + "/" + existingAudio;
    if (!existingAudio.startsWith(this.state.server)){
      action.audio = audioTarget;
    }
    const gId = action.gameId || action.game_id;
    if(this.state.session.gameId === gId){
      const actionidx = this.state.actions.findIndex( x => x._id === action._id);
      this.setState({
        actions: update(this.state.actions,
          { $splice: [[actionidx, 1, action]] }
        )
      });
    }
  }

  changeGame(gameSelected){
    var newSession = {
      gameId: gameSelected,
      email:this.state.session.email
    }
    this.setState(
      {
        session: newSession,
        games: [],
        players: [],
        chat: [],
        actions:[],
        rules: []
      }
    );
  }

  updateSession(uName, email, gId, leave=false){
    var newSession = {
      gameId: gId,
      email:email
    }
    this.setState(
      {
        session: newSession,
        games: [],
        players: [],
        chat: [],
        actions:[],
        rules: []
      }
    );

    if (leave){
      leaveChat(gId, email);
      getGames((err, gameList)=> {
        let initialGame = "";
        if (gameList && gameList.length > 0){
          initialGame = gameList[0].game_id
        }
        var init_games = {
          gameId: initialGame,
          email: this.state.session.email,
        };
        this.setState({
          session: init_games,
          games: gameList
        });
      });
      return;
    }

    getRules(gId, (err, ruleset) => {
      this.setState({rules: ruleset});
    });

    getActionLog(gId, (err, actionLog) => {
      if (actionLog && actionLog.length > 0){
        this.setState({actions: actionLog});
      }
    });

    getChatLog(gId, (err, chatLog) => {
      if (chatLog && chatLog.length > 0){
        this.setState({chat: chatLog});
      }
      joinChat(this.state.session.gameId, this.state.session.email, this.handleNewChat, this.handleNewAction, this.handleActionUpdate);
    });
  }

  render() {
    return (
      <div className="App">
      <Header sessionInfo={this.state.session} updateSession={this.updateSession} gameList={this.state.games} updateSelectedGame={this.changeGame} nuke={nukeDB} seed={seedDB}/>
      <PlayerList playerList={this.state.players}/>
      <Chat sessionInfo={this.state.session} chat={this.state.chat} actions={this.state.actions}/>
      <Rules sessionInfo={this.state.session} ruleSet={this.state.rules}/>
      </div>
    );
  }
}

export default App;

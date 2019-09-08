import React, { Component } from 'react';
import './App.css';
import Rules from './components/Rules';
import Chat from './components/Chat';
import Header from './components/Header';
import PlayerList from './components/PlayerList';
import {getPlayers, getGames, getChatLog, getActionLog, getRules} from './util/APIHelper';
import { joinChat, leaveChat } from './SocketAPI.js';

class App extends Component {
  constructor(props) {
    super(props);
    var sessionInfo = {
      gameId: "",
      username:"420Kiilah69",
      gitUName:"RebeccaGit"
    }
    this.state = {
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
    this.changeGame = this.changeGame.bind(this);

  }

  componentDidMount(){
    getGames((err, gameList)=> {
      var init_games = {
        gameId: gameList[0].game_id,
        username: this.state.session.username,
        gitUname: this.state.session.gitUname,
      };
      this.setState({
        session: init_games,
        games: gameList
      });
    });
  }

  handleNewChat(err, message) {
    this.setState({ chat: this.state.chat.concat(message)});
    console.log(this.state.chat);

  }

  handleNewAction(err, action) {
    if (action.game_id !== this.state.session.gameId){
      return;
    }
    this.setState({ actions: this.state.actions.concat(action)});
    console.log(this.state.actions);
    var server = process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000";
    var audio = new Audio(server + "/" + action.audio);
    audio.play();
  }

  changeGame(gameSelected){
    var newSession = {
      gameId: gameSelected,
      username:this.state.session.username,
      gitUName:this.state.session.gitUName
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

  updateSession(uName, gUName, gId, leave=false){
    var newSession = {
      gameId: gId,
      username:uName,
      gitUName:gUName
    }
    console.log(newSession);
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
      leaveChat(gId, uName);
      getGames((err, gameList)=> {
        var init_games = {
          gameId: gameList[0].game_id,
          username: this.state.session.username,
          gitUname: this.state.session.gitUname,
        };
        this.setState({
          session: init_games,
          games: gameList
        });
      });
      return;
    }
    getPlayers((err, playerList)=> {
      this.setState({players: playerList})
    });

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
      joinChat(this.state.session.gameId, this.state.session.username, this.handleNewChat, this.handleNewAction);
    });

  }

  render() {
    return (
      <div className="App">
      <Header sessionInfo={this.state.session} updateSession={this.updateSession} gameList={this.state.games} updateSelectedGame={this.changeGame}/>
      <PlayerList playerList={this.state.players}/>
      <Chat sessionInfo={this.state.session} chat={this.state.chat} actions={this.state.actions}/>
      <Rules sessionInfo={this.state.session} ruleSet={this.state.rules}/>
      </div>
    );
  }
}

export default App;

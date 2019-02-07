import React, { Component } from 'react';
import './App.css';
import Rules from './components/Rules';
import Chat from './components/Chat';
import Header from './components/Header';
import PlayerList from './components/PlayerList';
import {getPlayers, getChatLog, getRules} from './util/APIHelper';
import { joinChat } from './SocketAPI.js';

class App extends Component {
  constructor(props) {
    super(props);
    var sessionInfo = {
      gameId: "huuh",
      username:"420Kiilah69",
      gitUName:"RebeccaGit"
    }
    this.state = {
      session: sessionInfo,
      players: [],
      chat: [],
      rules: []
    }
    this.updateSession = this.updateSession.bind(this);

  }

  updateSession(uName, gUName, gId){
    var newSession = {
      gameId: gId,
      username:uName,
      gitUName:gUName
    }
    this.setState(
      {
        session: newSession
      }
    );
    getPlayers((err, playerList)=> {
      this.setState({players: playerList})
    });

    getChatLog(this.state.session.gameId, (err, chatLog) => {
      this.setState({chat: chatLog});
      joinChat(this.state.session.gameId, this.state.session.username, (err, message ) => this.setState({ chat: this.state.chat.concat(message)}));
    });

    getRules(this.state.session.gameId, (err, ruleset) => {
      this.setState({rules: ruleset});
    });


  }

  render() {
    return (
      <div className="App">
      <Header sessionInfo={this.state.session} updateSession={this.updateSession}/>
      <PlayerList playerList={this.state.players}/>
      <Chat sessionInfo={this.state.session} chat={this.state.chat}/>
      <Rules sessionInfo={this.state.session} ruleSet={this.state.rules}/>
      </div>
    );
  }
}

export default App;





/*
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
  // <table>
  //   <tbody>
  //     <tr>
  //       <td><GetPlayer/></td>
  //       <td><CreatePlayer/></td>
  //       <td><GetGame/></td>
  //       <td><CreateGame/></td>
  //       <td><Rules /></td>
  //       <td><WatchGame /></td>
  //       </tr>
  //   </tbody>
  // </table>
  */

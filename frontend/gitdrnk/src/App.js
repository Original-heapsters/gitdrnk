import React, { Component } from 'react';
import './App.css';
import GetPlayer from './components/GetPlayer';
import GetGame from './components/GetGame';
import CreateGame from './components/CreateGame';
import CreatePlayer from './components/CreatePlayer';
import Rules from './components/Rules';
import WatchGame from './components/WatchGame';
import Chat from './components/Chat';
import Header from './components/Header';
import PlayerList from './components/PlayerList';

class App extends Component {
  constructor(props) {
    super(props);
    var sessionInfo = {
      gameId: "DeathBall",
      username:"420Kiilah69",
      gitUName:"RebeccaGit"
    }
    this.state = {
      session: sessionInfo
    }
  }

  render() {
    return (
      <div className="App">
      <Header sessionInfo={this.state.session}/>
      <PlayerList sessionInfo={this.state.session}/>
      <Chat/>
      <Rules sessionInfo={this.state.session}/>

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

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

  render() {
    return (
      <div className="App">
      <Header/>
      <PlayerList/>
      <Chat/>
      <Rules/>

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

import React, { Component } from 'react';
import './App.css';
import GetPlayer from './components/GetPlayer';
import GetGame from './components/GetGame';
import CreateGame from './components/CreateGame';
import CreatePlayer from './components/CreatePlayer';
import Rules from './components/Rules';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GetPlayer/>
        <CreatePlayer/>
        <GetGame/>
        <CreateGame/>
        <Rules />
      </div>
    );
  }
}

export default App;

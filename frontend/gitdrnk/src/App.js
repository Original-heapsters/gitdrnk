import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GetPlayer from './components/GetPlayer';
import GetGame from './components/GetGame';
import CreateGame from './components/CreateGame';
import CreatePlayer from './components/CreatePlayer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GetPlayer/>
        <CreatePlayer/>
        <GetGame/>
        <CreateGame/>
      </div>
    );
  }
}

export default App;

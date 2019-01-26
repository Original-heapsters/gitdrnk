import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Square from './components/Square';
import GetPlayer from './components/GetPlayer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GetPlayer />
        </header>
      </div>
    );
  }
}

export default App;

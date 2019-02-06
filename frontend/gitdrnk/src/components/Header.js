import './Styles/Header.css';
import UserBox from './UserBox.js';
import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gameId: "DeathBall", }
  }


  render() {
    return (
      <div className="Header">
        <a href="#default" class="logo">{this.state.gameId}</a>
        <div class="Header-right">
          <UserBox/>
        </div>
      </div>
    );
  }
}

export default Header;

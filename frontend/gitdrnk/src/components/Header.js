import './Styles/Header.css';
import UserBox from './UserBox.js';
import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {gameId: props.gameId, }
  }


  render() {
    return (
      <div className="Header">
        <a href="#default" class="logo">{this.props.sessionInfo.gameId}</a>
        <div class="Header-right">
          <UserBox username={this.props.sessionInfo.username} gitUsername={this.props.sessionInfo.gitUName}/>
        </div>
      </div>
    );
  }
}

export default Header;

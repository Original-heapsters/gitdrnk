import './Styles/Header.css';
import UserBox from './UserBox.js';
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <a href="#default" className="logo">{this.props.sessionInfo.gameId}</a>
        <div className="Header-right">
          <UserBox
          username={this.props.sessionInfo.username}
          email={this.props.sessionInfo.email}
          gameId={this.props.sessionInfo.gameId}
          gameList={this.props.gameList}
          updateSession={this.props.updateSession}/>
        </div>
      </div>
    );
  }
}

export default Header;

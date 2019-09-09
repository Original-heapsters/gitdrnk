import './Styles/Header.css';
import UserBox from './UserBox.js';
import React from 'react';

const Header = ({sessionInfo, gameList, updateSession}) => {
  return (
    <div className="Header">
      <a href="#default" className="logo">{sessionInfo.gameId}</a>
      <div className="Header-right">
        <UserBox
        email={sessionInfo.email}
        gameId={sessionInfo.gameId}
        gameList={gameList}
        updateSession={updateSession}/>
      </div>
    </div>
  );
}

export default Header;

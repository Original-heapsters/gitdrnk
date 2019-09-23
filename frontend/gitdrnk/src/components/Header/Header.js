import './Styles/Header.scss';
import UserBox from './UserBox/UserBox.js';
import React from 'react';

const Header = ({sessionInfo, gameList, updateSession, nuke, seed}) => {
  let currEnv = process.env.REACT_APP_NODE_ENV || "development";
  return (
    <div className="Header">
      <a href="#default" className="logo">{sessionInfo.gameId}</a>
        {currEnv === "development" &&
          <div>
            <button onClick={nuke}>Nuke</button>
            <button onClick={seed}>Seed</button>
          </div>
        }
      <div className="Header-right">
        <UserBox
        email={sessionInfo.email}
        gameId={sessionInfo.gameId}
        signedIn={sessionInfo.signedIn}
        gameList={gameList}
        updateSession={updateSession}/>
      </div>
    </div>
  );
}

export default Header;

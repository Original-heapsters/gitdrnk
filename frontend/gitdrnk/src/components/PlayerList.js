import './Styles/PlayerList.css';
import React from 'react';
import PlayerCard from './PlayerCard.js'

const PlayerList = ({playerList}) => {
  return (
    <div className="PlayerList">
      <ul className="player-list">
        {playerList.map(player => {
          return (
            <PlayerCard key={player._id} player={player} />
         )
       })}
     </ul>
    </div>
  );
}

export default PlayerList;

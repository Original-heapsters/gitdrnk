import './Styles/PlayerList.css';
import React from 'react';

const PlayerList = ({playerList}) => {
  return (
    <div className="PlayerList">
    <ul>
      {playerList.map(player => {
        return (
         <li key={player._id}>
           <div>
             {player.username} aka {player.git_username}
           </div>
         </li>
       )
     })}
   </ul>
    </div>
  );
}

export default PlayerList;

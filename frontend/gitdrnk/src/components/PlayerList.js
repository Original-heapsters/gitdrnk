import './Styles/PlayerList.css';
import React from 'react';

class PlayerList extends React.Component {
  render() {
    return (
      <div className="PlayerList">
      <ul>
        {this.props.playerList.map(player => {
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
}

export default PlayerList;

import './Styles/PlayerList.css';
import React from 'react';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: this.props.sessionInfo.gameId,
      playerList: []
    }
  }

  componentDidMount() {
    const playerEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/players/all';
    fetch(playerEndpoint)
      .then(response => response.json())
      .then(players => this.setState({ playerList: players.players }));
  }


  render() {
    return (
      <div className="PlayerList">
      <ul>
        {this.state.playerList.map(player => {
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

import './Styles/GetGame.css';
import React from 'react';

class GetGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {gameList:[]}
  }

  handleSubmit(e) {
    const gameEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/games/all';

    fetch(gameEndpoint)
      .then(response => response.json())
      .then(games => this.setState({ gameList: games }));
    e.preventDefault();
  }

  render() {
    return (
      <div className="GetGame">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Get All Games" />
        </form>
        <ul>
          {this.state.gameList.map(game =>
            <li key={game._id}>
              <p> {game.game_id}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default GetGame;

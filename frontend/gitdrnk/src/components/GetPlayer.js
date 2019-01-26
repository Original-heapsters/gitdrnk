import React, { Component } from 'react';

class GetPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {playerList: []}
  }

  handleSubmit(e) {
    const playerEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/players/all';
    fetch(playerEndpoint)
      .then(response => response.json())
      .then(players => this.setState({ playerList: players }));
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Get All Users" />
        </form>
        <ul>
          {this.state.playerList.map(player =>
            <li key={player._id}>
              <p> {player.username}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default GetPlayer;

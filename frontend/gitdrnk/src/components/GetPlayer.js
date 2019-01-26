import React, { Component } from 'react';

class GetPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {players:[]}
  }

  handleSubmit(e) {
    alert(process.env.REACT_APP_GITDRNK_SVC);
    var playerEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/players/all'
    fetch(playerEndpoint)
      .then(response => response.json())
      .then(players => this.setState({ players }));
    // alert('The value is: ' + this.input.value);
    e.preventDefault();
  }

  render() {
    const{ players } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Get All Users" />
        </form>
        <ul>
          {players.map(player =>
            <li>
              <p> player.username</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default GetPlayer;

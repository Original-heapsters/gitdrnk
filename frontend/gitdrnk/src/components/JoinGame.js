import React, { Component } from 'react';

class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      gameId: '',
      playerUsername: '',
      playerCreateSuccess: ''
    }
  }

  handleSubmit(e) {
    const playerEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/game/join';
    const postObj = {'username': this.state.playerUsername}
    fetch(playerEndpoint,{
    method: 'POST',
    body: JSON.stringify(postObj),
    headers: {'Content-Type':'application/json'}})
      .then(response => response.json())
      .then(createResult => this.setState({ playerCreateSuccess: createResult.message }));
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({playerUsername: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={ this.state.playerUsername } onChange={ this.handleChange }/>
          </label>
          <input type="submit" value="Join the party" />
        </form>
        <ul>
          <li >
            <p> {this.state.playerCreateSuccess}</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default JoinGame;

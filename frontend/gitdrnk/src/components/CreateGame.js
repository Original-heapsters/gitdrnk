import React, { Component } from 'react';

class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      gameId:'',
      creationSuccess:''
    }
  }

  handleSubmit(e) {
    const gameEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/game/new';
    const postObj = {'game_id': this.state.gameId}
    fetch(gameEndpoint,{
    method: 'POST',
    body: JSON.stringify(postObj),
    headers: {'Content-Type':'application/json'}})
      .then(response => response.json())
      .then(createResult => this.setState({ creationSuccess: createResult.message }));
    e.preventDefault();
  }

  handleChange(e) {

    this.setState({gameId: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Game ID:
            <input type="text" value={ this.state.gameId } onChange={ this.handleChange }/>
          </label>
          <input type="submit" value="Create Game" />
        </form>
        <ul>
          <li >
            <p> {this.state.creationSuccess}</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default CreateGame;

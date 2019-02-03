import './Styles/WatchGame.css';
import { joinGame } from '../SocketAPI.js';
import React from 'react';

class WatchGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGameChange = this.handleGameChange.bind(this);
    this.state = {
      playerUsername:'',
      gameId:'',
      eventLog: []
    }
  }

  handleSubmit(e) {
    joinGame(this.state.playerUsername, this.state.gameId, (err, event ) => this.setState({ eventLog: this.state.eventLog.concat(event)}));
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({playerUsername: e.target.value});
  }

  handleGameChange(e) {
    this.setState({gameId: e.target.value});
  }

  render() {
    return (
      <div className="WatchGame">
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={ this.state.playerUsername } onChange={ this.handleChange }/>
            GameId:
            <input type="text" value={ this.state.gameId } onChange={ this.handleGameChange }/>
          </label>
          <input type="submit" value="Join the game" />
        </form>
        <ul>
          {this.state.eventLog.map(event =>
            <li key={event.date}>
              <p> {event.date} - {event.user} - {event.type} - {event.game} </p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default WatchGame;

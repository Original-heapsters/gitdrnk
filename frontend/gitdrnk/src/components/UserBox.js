import './Styles/UserBox.css';
import React from 'react';

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: this.props.username, email: this.props.email, gameId: this.props.gameId}
    this.handleChange = this.handleChange.bind(this)
    this.handleGitEmailChange = this.handleGitEmailChange.bind(this)
    this.handleGameChange = this.handleGameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handleGitEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleGameChange(e) {
    this.setState({
      gameId: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if(!this.state.gameId){
      this.props.updateSession(this.state.username, this.state.email, this.props.gameId);
    } else{
      this.props.updateSession(this.state.username, this.state.email, this.state.gameId);
    }

  }

  leaveRoom() {
    this.props.updateSession(this.state.username, this.state.email, this.props.gameId, true);
    this.setState({gameId:null});
  }

  render() {
    return (
      <div className="UserBox">
        <form
          onSubmit={this.handleSubmit}
          className="LoginForm">
          <input
            onChange={this.handleChange}
            value={this.state.username}
            placeholder="Enter your username"
            type="text" />
          <input
            onChange={this.handleGitEmailChange}
            value={this.state.email}
            placeholder="Enter your git email"
            type="text" />
          <select onChange={this.handleGameChange}>
            {this.props.gameList.map(game => {
              return (
                <option key={game._id} value={game.game_id}>{game.game_id}</option>
              )
            })}
          </select>
          <input type="submit" value="Join Room"/>
        </form>
        <button onClick={this.leaveRoom}>
          Leave Room
        </button>

      </div>
    );
  }
}

export default UserBox;

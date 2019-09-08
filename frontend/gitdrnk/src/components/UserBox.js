import './Styles/UserBox.css';
import React from 'react';

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: this.props.username, gitUsername: this.props.gitUsername, gameId: this.props.gameId}
    this.handleChange = this.handleChange.bind(this)
    this.handleGitUNameChange = this.handleGitUNameChange.bind(this)
    this.handleGameChange = this.handleGameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handleGitUNameChange(e) {
    this.setState({
      gitUsername: e.target.value
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
      this.props.updateSession(this.state.username, this.state.gitUsername, this.props.gameId);
    } else{
      this.props.updateSession(this.state.username, this.state.gitUsername, this.state.gameId);
    }

  }

  leaveRoom() {
    this.props.updateSession(this.state.username, this.state.gitUsername, this.props.gameId, true);
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
            onChange={this.handleGitUNameChange}
            value={this.state.gitUsername}
            placeholder="Enter your git username"
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

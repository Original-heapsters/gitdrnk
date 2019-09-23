import './Styles/UserBox.scss';
import React from 'react';

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: this.props.email, gameId: this.props.gameId, signedIn: this.props.signedIn}
    this.handleGitEmailChange = this.handleGitEmailChange.bind(this)
    this.handleGameChange = this.handleGameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.leaveRoom = this.leaveRoom.bind(this);
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
      {!this.props.signedIn &&
        <form
          onSubmit={this.handleSubmit}
          className="LoginForm">
          <input
            onChange={this.handleGitEmailChange}
            value={this.state.email}
            placeholder="Enter your git email"
            type="text" />
          <select onChange={this.handleGameChange}>
            {this.props.gameList && this.props.gameList.map(game => {
              return (
                <option key={game._id} value={game.game_id}>{game.game_id}</option>
              )
            })}
          </select>
          <input type="submit" value="Join Room"/>
        </form>
      }
      {this.props.signedIn &&
        <button onClick={this.leaveRoom}>
          Leave Room
        </button>
      }
      </div>
    );
  }
}

export default UserBox;

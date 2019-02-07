import './Styles/UserBox.css';
import React from 'react';

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: this.props.username, gitUsername: this.props.gitUsername, gameId: this.props.gameId }
    this.handleChange = this.handleChange.bind(this)
    this.handleGitUNameChange = this.handleGitUNameChange.bind(this)
    this.handleGameChange = this.handleGameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    this.props.updateSession(this.state.username, this.state.gitUsername, this.state.gameId);
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
              <input
                onChange={this.handleGameChange}
                value={this.state.gameId}
                placeholder="Enter the gameId"
                type="text" />
              <input type="submit" value="submit"/>
        </form>

      </div>
    );
  }
}

export default UserBox;

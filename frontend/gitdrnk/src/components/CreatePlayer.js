import './Styles/CreatePlayer.css';
import React from 'react';

class CreatePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeGitUsername = this.handleChangeGitUsername.bind(this);
    this.state = {
      playerUsername:'',
      gitUsername:'',
      playerCreateSuccess:''
    }
  }

  handleSubmit(e) {
    const playerEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/player/new';
    const postObj = {'username': this.state.playerUsername,
                     'git_username': this.state.gitUsername}
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

  handleChangeGitUsername(e) {
    this.setState({gitUsername: e.target.value});
  }

  render() {
    return (
      <div className="CreatePlayer">
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={ this.state.playerUsername } onChange={ this.handleChange }/>
            Git Username:
            <input type="text" value={ this.state.gitUsername } onChange={ this.handleChangeGitUsername }/>
          </label>
          <input type="submit" value="Join the party" />
        </form>
          <p> {this.state.playerCreateSuccess}</p>
      </div>
    );
  }
}

export default CreatePlayer;

import './Styles/GetPlayer.css';
import React from 'react';

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

  getPlayerTable(){
    if (this.state.playerList.length > 0) {
      return (
        <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Git Username</th>
          </tr>
          {this.state.playerList.map(player =>
            <tr key={player._id}>
              <td>{player.username}</td>
              <td>{player.git_username}</td>
            </tr>
          )}
          </tbody>
        </table>
      );
    }
  }

  render() {
    const playerTable = this.getPlayerTable();

    return (
      <div className="GetPlayer">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Get All Users" />
        </form>
        {playerTable}
      </div>
    );
  }
}

export default GetPlayer;

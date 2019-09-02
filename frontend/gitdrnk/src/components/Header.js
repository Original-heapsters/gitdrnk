import './Styles/Header.css';
import UserBox from './UserBox.js';
import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var selectedGame = e.target.value;
    this.props.updateSelectedGame(selectedGame);
    console.log("Udated selected game to " + selectedGame);
  }

  render() {
    return (
      <div className="Header">
        <a href="#default" className="logo">{this.props.sessionInfo.gameId}</a>
        <select onChange={this.handleSubmit}>
          {this.props.gameList.map(game => {
            return (
              <option key={game._id} value={game.game_id}>{game.game_id}</option>
            )
          })}
        </select>
        <div className="Header-right">
          <UserBox username={this.props.sessionInfo.username} gitUsername={this.props.sessionInfo.gitUName} gameId={this.props.sessionInfo.gameId} updateSession={this.props.updateSession}/>
        </div>
      </div>
    );
  }
}

export default Header;

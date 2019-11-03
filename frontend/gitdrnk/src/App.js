import React, { Component } from 'react';
// import update from 'immutability-helper';
import TopBar from './Containers/TopBar'
import SideBar from './Containers/SideBar'
import MainChat from './Containers/MainChat'
import { getGitInfo, getPlayersByGame, getGames, getChatLog, getActionLog} from './util/APIHelper';
import { joinChat, leaveChat } from './util/SocketHelper.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      server: process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000",
      profilePicLink:null,
      username:null,
      email:null,
      gameTitle:'',
      gameList:[],
      playerList:[],
      actionList:[],
      messageList:[]
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleGameJoin = this.handleGameJoin.bind(this);
    this.handleNewChat = this.handleNewChat.bind(this);
    this.handleNewAction = this.handleNewAction.bind(this);
    // this.handleActionUpdate = this.handleActionUpdate.bind(this);
  }

  handleLogout(){
    leaveChat(this.state.gameTitle, this.state.email)
    this.setState({
      gameTitle:'',
      profilePicLink:null,
      username:null,
      email:null,
      playerList:[],
      actionList:[],
      messageList:[],
    })
  }

  handleLogin(gitEmail){
    // TODO: Send api call to login
    //       get git username+profile and populate the following
    getGitInfo(gitEmail, player => {
      this.setState({
        profilePicLink:player.profile_picture,
        username:player.username,
        email:player.email,
      })
    })

    getGames((err, games) => {
      this.setState({gameList : games});
    })
  }

  handleGameJoin(gameId){
    getGames((err, games) => {
      let gameListing = games.filter(function(value, index, arr){
        return value.game_id !== gameId;
      })
      this.setState({gameList : gameListing});
    })

    this.setState({
      gameTitle:'',
      playerList:[],
      actionList:[],
      messageList:[],
    });

    getActionLog(gameId, (err, actionLog) => {
      if (actionLog && actionLog.length > 0){
        this.setState({actionList: actionLog});
      }
    })

    getPlayersByGame(gameId, (err,players) => {
      this.setState({
        gameTitle:gameId,
        playerList:players
      })
    })

    getChatLog(gameId, (err, chatLog) => {
      if (chatLog && chatLog.length > 0){
        this.setState({messageList: chatLog});
      }
      joinChat(gameId, this.state.email, this.handleNewChat, this.handleNewAction, ()=>{})
    })
  }

  handleNewChat(err, message) {
    this.setState({ messageList: this.state.messageList.concat(message)});
  }

  handleNewAction(err, action) {
    if (action.game_id !== this.state.gameTitle){
      return;
    }
    let actionList = this.state.actionList.concat(action)

    actionList.map(action => {
      if (action.audio){
        const existingAudio = action.audio || ""
        const audioTarget = this.state.server + "/" + existingAudio;
        if (!existingAudio.startsWith(this.state.server)){
          action.audio = audioTarget;
        }
      }
      return action
    });
    if (action.audio){
      var audio = new Audio(action.audio);
      audio.play();
    }
    this.setState({ actionList: actionList});
  }
  //
  // handleActionUpdate(err, action){
  //   const existingAudio = action.audio || ""
  //   const audioTarget = this.state.server + "/" + existingAudio;
  //   if (!existingAudio.startsWith(this.state.server)){
  //     action.audio = audioTarget;
  //   }
  //   const gId = action.gameId || action.game_id;
  //   if(this.state.session.gameId === gId){
  //     const actionidx = this.state.actions.findIndex( x => x._id === action._id);
  //     this.setState({
  //       actions: update(this.state.actions,
  //         { $splice: [[actionidx, 1, action]] }
  //       )
  //     });
  //   }
  // }
  //

  render() {
    return (
      <div className="App">
        <TopBar
          profilePicture={this.state.profilePicLink}
          uName={this.state.username}
          uEmail={this.state.email}
          title={this.state.gameTitle}
          onLogout={this.handleLogout}
          onLogin={this.handleLogin}/>
        <SideBar
          currentGame={this.state.gameTitle}
          games={this.state.gameList}
          players={this.state.playerList}
          onGameJoin={this.handleGameJoin}/>
        <MainChat
          gameId={this.state.gameTitle}
          email={this.state.email}
          actions={this.state.actionList}
          messages={this.state.messageList}/>
      </div>
    );
  }
}

export default App;

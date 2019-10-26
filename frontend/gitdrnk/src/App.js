import React, { Component } from 'react';
import update from 'immutability-helper';
import TopBar from './Containers/TopBar'
import SideBar from './Containers/SideBar'
import MainChat from './Containers/MainChat'
import { getGitInfo, getPlayersByGame, getGames, getChatLog, getActionLog, getRules, nukeDB, seedDB} from './util/APIHelper';
import { joinChat, leaveChat } from './util/SocketHelper.js';

class App extends Component {
  constructor(props) {
    super(props);
    // var sessionInfo = {
    //   gameId: "",
    //   email:"",
    //   signedIn: false
    // }
    this.state = {
      server: process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000",
      profilePicLink:null,
      username:null,
      email:null,
      gameTitle:'',
      gameList:[],
      playerList:[],
      actionList:[],
      messageList:[],







      //
      // session: sessionInfo,
      // players: [],
      // chat: [],
      // actions:[],
      // rules: [],
      // games: []
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleGameJoin = this.handleGameJoin.bind(this);
    // this.updateSession = this.updateSession.bind(this);
    this.handleNewChat = this.handleNewChat.bind(this);
    this.handleNewAction = this.handleNewAction.bind(this);
    // this.handleActionUpdate = this.handleActionUpdate.bind(this);
    // this.changeGame = this.changeGame.bind(this);

  }

  handleLogout(){
    this.setState({
      profilePicLink:null,
      username:null,
      email:null,
      playerList:[],
      actionList:[],
      messageList:[],
    })
  }

  handleLogin(gitEmail){
    console.log(gitEmail)

    // TODO: Send api call to login
    //       get git username+profile and populate the following
    getGitInfo(gitEmail, player => {
      console.log(player)
      this.setState({
        profilePicLink:player.profile_picture,
        username:player.username,
        email:player.email,
      })
    })
  }

  handleGameJoin(gameId){
    this.setState({
      gameTitle:'',
      playerList:[],
      actionList:[],
      messageList:[],
    });
    joinChat(gameId, this.state.email, this.handleNewChat, this.handleNewAction, ()=>{})
    getPlayersByGame(gameId, (err,players) => {
      this.setState({
        gameTitle:gameId,
        playerList:players
      })
    })
  }

  componentWillMount(){
    getGames((err, games) => {
      this.setState({gameList : games});
    })
  }

  componentDidMount(){
    // getGames((err, gameList)=> {
    //   let initialGame = "";
    //   if (gameList && gameList.length > 0){
    //     initialGame = gameList[0].game_id
    //   }
    //   let init_games = {
    //     gameId: initialGame,
    //     email: this.state.session.email,
    //     signedIn: false
    //   };
    //   this.setState({
    //     session: init_games,
    //     games: gameList
    //   });
    // });
  }


  //
  handleNewChat(err, message) {
    console.log(message)
    this.setState({ messageList: this.state.messageList.concat(message)});
  }

  handleNewAction(err, action) {
    console.log(action)
    if (action.gameId !== this.state.gameTitle){
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
  // changeGame(gameSelected){
  //   var newSession = {
  //     gameId: gameSelected,
  //     email:this.state.session.email,
  //     signedIn: false
  //   }
  //   this.setState(
  //     {
  //       session: newSession,
  //       games: [],
  //       players: [],
  //       chat: [],
  //       actions:[],
  //       rules: []
  //     }
  //   );
  // }
  //
  // updateSession(uName, email, gId, leave=false){
  //   var newSession = {
  //     gameId: gId,
  //     email:email,
  //     signedIn: true
  //   }
  //   this.setState(
  //     {
  //       session: newSession,
  //       games: [],
  //       players: [],
  //       chat: [],
  //       actions:[],
  //       rules: []
  //     }
  //   );
  //
  //   if (leave){
  //     leaveChat(gId, email);
  //     getGames((err, gameList)=> {
  //       let initialGame = "";
  //       if (gameList && gameList.length > 0){
  //         initialGame = gameList[0].game_id
  //       }
  //       var init_games = {
  //         gameId: initialGame,
  //         email: this.state.session.email,
  //         signedIn: false
  //       };
  //       this.setState({
  //         session: init_games,
  //         games: gameList
  //       });
  //     });
  //     return;
  //   }
  //
  //   getRules(gId, (err, ruleset) => {
  //     this.setState({rules: ruleset});
  //   });
  //
  //   getActionLog(gId, (err, actionLog) => {
  //     if (actionLog && actionLog.length > 0){
  //       this.setState({actions: actionLog});
  //     }
  //   });
  //
  //   getChatLog(gId, (err, chatLog) => {
  //     if (chatLog && chatLog.length > 0){
  //       this.setState({chat: chatLog});
  //     }
  //     joinChat(this.state.session.gameId, this.state.session.email, this.handleNewChat, this.handleNewAction, this.handleActionUpdate);
  //   });
  // }

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
          actions={this.state.actionList}
          messages={this.state.messageList}/>
      </div>
    );
  }
}

export default App;

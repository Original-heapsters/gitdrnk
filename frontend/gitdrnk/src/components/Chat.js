import './Styles/Chat.css';
import { joinChat, sendChatMessage } from '../SocketAPI.js';
import Title from './Title'
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import React from 'react';

const DUMMY_DATA = [
  {
    _id: 789,
    username: "soCoolBoi",
    message: "who'll win?",
    date: "2019-01-01 13:05:32"
  },
  {
    _id: 123,
    username: "InstaH0",
    message: "who'll win? ME",
    date: "2019-01-01 13:05:32"
  }
]

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: DUMMY_DATA,
      playerUsername:'420Kiilah69',
      gameId:'DeathBall'
    }

    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage(message){
    console.log(this.state);
    sendChatMessage(this.state.gameId, this.state.playerUsername, message);
  }

  componentDidMount() {
    joinChat(this.state.gameId, this.state.playerUsername, (err, message ) => this.setState({ messages: this.state.messages.concat(message)}));
  }

  render() {
    return (
      <div className="Chat">
      <Title/>
      <MessageList messages={this.state.messages}/>
      <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default Chat;

import './Styles/Message.scss';
import './Styles/ChatMessage.scss';
import React from 'react'
import Profile from '../Profile/Profile.js';

const ChatMessage = ({chat}) => {
  return (
          <li className='Message ChatMessage'>
            <Profile imgLink={chat.profile_picture} username={chat.username}/>
            <p>{chat.message}</p>
            <span className="time-right">{chat.date}</span>
          </li>
        );
};
export default ChatMessage;

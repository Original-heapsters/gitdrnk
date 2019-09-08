import './Styles/ChatMessage.css';
import React from 'react'
const ChatMessage = ({messageObj}) => {
  return (
          <li className='ChatMessage'>
            <img src={messageObj.profile_picture} alt=""/>
            <p>{messageObj.message}</p>
            <span className="username-left">{messageObj.username}</span>
            <span className="time-right">{messageObj.date}</span>
          </li>
        );
};
export default ChatMessage;

import './Styles/ChatMessage.css';
import React from 'react'
const ChatMessage = ({messageObj}) => {
  return (
          <li className='ChatMessage'>
          <img src="https://images.fineartamerica.com/images-medium-large-5/boy-making-angry-face-c1960s-h-armstrong-robertsclassicstock.jpg" alt=""/>
            <p>{messageObj.message}</p>
            <span className="username-left">{messageObj.username}</span>
            <span className="time-right">{messageObj.date}</span>
          </li>
        );
};
export default ChatMessage;

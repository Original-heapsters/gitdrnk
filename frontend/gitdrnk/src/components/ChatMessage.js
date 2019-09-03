import './Styles/ChatMessage.css';
import React from 'react'
const ChatMessage = ({messageObj}) => {
  return (
          <li key={messageObj._id} className='ChatMessage'>
              {messageObj.type} {messageObj.username} @ {messageObj.date}    {messageObj.message}
          </li>
        );
};

export default ChatMessage;

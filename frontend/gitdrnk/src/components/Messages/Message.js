import './Styles/Message.scss';
import React from 'react';
import ActionMessage from './ActionMessage.js';
import ChatMessage from './ChatMessage.js';

const Message = ({messageObj}) => {
  if (messageObj.message){
    return (
      <ChatMessage chat={messageObj} />
    );
  } else {
    // Represents a git action triggered
    return (
      <ActionMessage action={messageObj}/>
    );
  }
};

export default Message;

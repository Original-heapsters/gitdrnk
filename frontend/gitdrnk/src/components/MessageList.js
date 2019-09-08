import './Styles/MessageList.css';
import React,  { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage.js';
import ActionMessage from './ActionMessage.js';

const MessageList = ({messages, actions}) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div className="MessageList">
      <ul className="message-list">
        {messages
          .concat(actions)
          .sort((a,b) => {
            var left = new Date(a.date);
            var right = new Date(b.date);
            return left<right ? -1 : left>right ? 1 : 0;
          })
          .map(messageItem => {
            console.log(messageItem);
            var msgObj;
             if (messageItem.message){
              msgObj = <ChatMessage key={messageItem._id} messageObj={messageItem}/>;
             } else {
              msgObj = <ActionMessage key={messageItem._id} messageObj={messageItem}/>;
             }
             return msgObj
           })
         }
         <div ref={messagesEndRef} />
     </ul>
    </div>
  );
}

export default MessageList;

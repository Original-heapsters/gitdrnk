import './Styles/MessageList.css';
import React,  { useEffect, useRef } from 'react';
import Message from './Messages/Message.js';

const MessageList = ({messages, actions}) => {

  const chatObjList = messages.concat(actions);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chatObjList]);

  return (
    <div className="MessageList">
      <ul className="message-list">
        {chatObjList
          .sort((a,b) => {
            var left = new Date(a.date);
            var right = new Date(b.date);
            return left<right ? -1 : left>right ? 1 : 0;
          })
          .map(messageItem => {
            return <Message key={messageItem._id} messageObj={messageItem}/>;
           })
         }
         <div ref={messagesEndRef} />
     </ul>
    </div>
  );
}

export default MessageList;
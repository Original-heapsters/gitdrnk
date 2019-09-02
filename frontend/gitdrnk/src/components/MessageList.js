import './Styles/MessageList.css';
import React from 'react';
import ChatMessage from './ChatMessage.js';
import ActionMessage from './ActionMessage.js';

class MessageList extends React.Component {
  organizeChat(){
    this.props.messages.map(messageItem => {
      return(
       <li key={messageItem._id}>
           {messageItem.type} {messageItem.username} @ {messageItem.date}    {messageItem.message}
       </li>
     )
   })
  }

  render() {
    return (
      <div className="MessageList">
        <ul className="message-list">
          {this.props.messages
            .concat(this.props.actions)
            .sort((a,b) => {
              var left = new Date(a.date);
              var right = new Date(b.date);
              return left<right ? -1 : left>right ? 1 : 0;
            })
            .map(messageItem => {
               if (messageItem.message){
                return(<ChatMessage messageObj={messageItem}/>);
               } else {
                return (<ActionMessage messageObj={messageItem}/>);
               }
             })
           }
       </ul>
      </div>
    );
  }
}

export default MessageList;

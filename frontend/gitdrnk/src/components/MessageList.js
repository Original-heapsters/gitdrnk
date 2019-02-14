import './Styles/MessageList.css';
import React from 'react';

class MessageList extends React.Component {
  render() {
    return (
      <div className="MessageList">
        <ul className="message-list">
          {this.props.messages.map(messageItem => {
            return(
             <li key={messageItem._id}>
                 {messageItem.type} {messageItem.username} @ {messageItem.date}    {messageItem.message}
             </li>
           )
         })}
       </ul>
      </div>
    );
  }
}

export default MessageList;

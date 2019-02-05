import './Styles/MessageList.css';
import React from 'react';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MessageList">
      <ul className="message-list">
        {this.props.messages.map(message => {
          return (
           <li key={message._id}>
             <div>
               {message.type} {message.username} @ {message.date}
             </div>
             <div>
               {message.message}
             </div>
           </li>
         )
       })}
     </ul>
      </div>
    );
  }
}

export default MessageList;

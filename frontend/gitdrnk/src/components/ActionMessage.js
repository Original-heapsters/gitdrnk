import './Styles/ActionMessage.css';
import React from 'react'
const ActionMessage = ({messageObj}) => {
  return (
          <li key={messageObj._id} className="ActionMessage">
              ACTION {messageObj.type} {messageObj.username} @ {messageObj.date}    {messageObj.type}
          </li>
        );
};

export default ActionMessage;

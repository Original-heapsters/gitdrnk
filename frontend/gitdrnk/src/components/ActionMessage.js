import './Styles/ActionMessage.css';
import React from 'react'

const ActionMessage = ({messageObj}) => {
  let consequence;

  if (messageObj.consequence){
    consequence = "-> " + messageObj.consequence;
  }

  return (
          <li className="ActionMessage darker">
            <img src={messageObj.profile_picture} alt="" className="right"/>
            <p>{messageObj.action}{consequence}</p>
            <span className="time-left">{messageObj.date}</span>
            <span className="username-right">{messageObj.username}</span>
          </li>
        );
};

export default ActionMessage;

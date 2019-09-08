import './Styles/ActionMessage.css';
import React from 'react'

const ActionMessage = ({messageObj}) => {
  var consequence;

  if (messageObj.consequence){
    consequence = "-> " + messageObj.consequence;
  }

  return (
          <li className="ActionMessage darker">
            <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="" className="right"/>
            <p>{messageObj.action}{consequence}</p>
            <span className="time-left">{messageObj.date}</span>
            <span className="username-right">{messageObj.username}</span>
          </li>
        );
};

export default ActionMessage;

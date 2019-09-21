import './Styles/Message.scss';
import './Styles/ActionMessage.scss';
import React from 'react';
import Profile from '../Profile/Profile.js';

const ActionMessage = ({action}) => {
  let consequence = "";
  if (action.consequence){
    consequence = "-> " + action.consequence;
  }
  return (
          <li className="Message ActionMessage">
            <Profile imgLink={action.profile_picture} username={action.username}/>
            <p>{action.action}{consequence}</p>
            <span className="time-left">{action.date}</span>
          </li>
        );
};

export default ActionMessage;

import './Styles/Message.scss';
import './Styles/ActionMessage.scss';
import React from 'react';
import Profile from '../Profile/Profile.js';
import {updateAction} from '../../util/APIHelper.js';


const ActionMessage = ({action}) => {
  const handleChecked = (e) => {
    updateAction(action.game_id, action._id);
  }

  const playAudio = () => {
    var audio = new Audio(action.audio);
    audio.play();
  };

  let consequence = "";
  let points = ` +${action.points}`;

  if (action.consequence){
    consequence = `-> ${action.consequence}`;
  }

  return (
          <li className="Message ActionMessage"
              onClick={playAudio}>
            <Profile imgLink={action.profile_picture} username={action.username}/>
            <p>{action.action}{consequence} | {points}</p>
            <input type="checkbox" value="Completed" onChange={handleChecked} checked={action.complete || false}/>
            <span className="time-left">{action.date}</span>
          </li>
        );
};

export default ActionMessage;

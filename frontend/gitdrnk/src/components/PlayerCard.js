import './Styles/PlayerCard.css';
import React from 'react'
import Profile from './Profile/Profile.js';

const PlayerCard = ({player}) => {
  return (
          <li className='PlayerCard'>
            <Profile imgLink={player.profile_picture} username={player.username} />
            Git email:{player.email}
          </li>
        );
};
export default PlayerCard;

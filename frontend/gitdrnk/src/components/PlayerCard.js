import './Styles/PlayerCard.css';
import React from 'react'

const PlayerCard = ({player}) => {
  return (
          <li className='PlayerCard'>
            <img src={player.profile_picture} alt=""/>
            Usename:{player.username}
            <br/>
            Git email:{player.email}
          </li>
        );
};
export default PlayerCard;

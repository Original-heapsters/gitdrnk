import './Styles/profile.scss';
import React from 'react'
const Profile = ({imgLink, username}) => {
  return (
          <figure className='Profile'>
            <img className='ProfilePicture' src={imgLink} alt=""/>
            <figcaption>{username}</figcaption>
          </figure>
        );
};
export default Profile;

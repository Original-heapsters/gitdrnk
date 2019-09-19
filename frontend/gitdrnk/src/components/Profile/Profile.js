import './Styles/profile.scss';
import React from 'react'
const Profile = ({imgLink, username}) => {
  return (
    <div className="Profile">
        <img className="ProfilePicture" src={imgLink} alt="Avatar"/>
        <center>{username}</center>
    </div>

        );
};
export default Profile;

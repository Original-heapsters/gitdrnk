import React from 'react';
import './Styles/SmallProfile.scss'

const SmallProfile = ({profilePicLink, username}) => {
  const profilePic = profilePicLink || 'gitdrnk_logo.png'
  const uName = username || 'testUser69'

  return (
    <div className="SmallProfile">
      <img className="SmallProfileAvatar" src={profilePic} alt="Avatar"/>
      <figcaption>{uName}</figcaption>
    </div>
  )
}

export default SmallProfile

import React from 'react'
import './Styles/MainProfile.scss'

const MainProfile = ({profilePicLink, username, userEmail}) => {
  const profilePic = profilePicLink || 'gitdrnk_logo.png'
  const uName = username || 'testUser69'
  const uEmail = userEmail || 'testUser69@gmail.com'
  return (
    <div className='MainProfile'>
    <img className='MainProfileAvatar' src={profilePic} alt="Avatar"/>
    <div className='MainProfileUserInfo'>
      <p>{uName}</p>
      <p>{uEmail}</p>
    </div>
    </div>
  )
}

export default MainProfile

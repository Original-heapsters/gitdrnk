import React from 'react'
import './Styles/PlayerListItem.scss'

const PlayerListItem = ({isActive, userName, points, profilePicLink}) => {
  const active = isActive || false
  const pts = points || '0'
  const uName = userName || 'testUser69'
  const profilePic = profilePicLink || 'gitdrnk_logo.png'
  return (
    <div className='PlayerListItem'>
      <div className={(active) ? 'PlayerListItem-Indicator-active': 'PlayerListItem-Indicator-inactive' }/>
      <div className='PlayerListItem-Name'>
        <p>{uName}</p>
      </div>
      <div className='PlayerListItem-Pic'>
      <img className="SmallProfileAvatar" src={profilePic} alt="Avatar"/>
      </div>
      <div className='PlayerListItem-Points'>
      <p>{pts} Points</p>
      </div>
    </div>
  )
}

export default PlayerListItem

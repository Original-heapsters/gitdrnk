import React from 'react'
import './Styles/MessageHolder.scss'
import SmallProfile from '../../SmallProfile/SmallProfile'

const MessageHolder = ({profilePic, user, message, timestamp}) => {
  return (
    <div className='MessageHolder'>
      <div className='MessageHolder-User'>
        <SmallProfile profilePicLink={profilePic} username={user}/>
      </div>
      <div className='MessageHolder-Text'>
        <p>{message}</p>
      </div>
      <div className='MessageHolder-Timestamp'>
        <p>{timestamp}</p>
      </div>
    </div>
  )
}

export default MessageHolder

import React from 'react'
import './Styles/MessageHolder.scss'
import SmallProfile from '../../SmallProfile/SmallProfile'

const MessageHolder = ({message, timestamp}) => {
  const time = timestamp || '2019-4-20 04:20:69'
  const msg = message || 'yooooooo sick'
  return (
    <div className='MessageHolder'>
      <div className='MessageHolder-User'>
        <SmallProfile />
      </div>
      <div className='MessageHolder-Text'>
        <p>{msg}</p>
      </div>
      <div className='MessageHolder-Timestamp'>
        <p>{time}</p>
      </div>
    </div>
  )
}

export default MessageHolder

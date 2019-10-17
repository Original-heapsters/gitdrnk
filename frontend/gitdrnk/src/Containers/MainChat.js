import React from 'react'
import './Styles/MainChat.scss'
import TextEntry from '../components/TextEntry/TextEntry'
import ActionHolder from '../components/Messages/ActionHolder/ActionHolder'
import MessageHolder from '../components/Messages/MessageHolder/MessageHolder'

const MainChat = () => {
  return (
    <div className='MainChat'>
      <div className='ChatWindow'>
        <ActionHolder/>
        <ActionHolder/>
        <MessageHolder/>
        <ActionHolder claimed='true'/>
        <MessageHolder/>

      </div>
      <div className='EntryArea'>
        <TextEntry/>
      </div>
    </div>
  )
}

export default MainChat

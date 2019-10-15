import React from 'react'
import './Styles/CurrentGameListItem.scss'

const CurrentGameListItem = ({gameTitle}) => {
  const gameName = gameTitle || 'testCurrentGame'
  return (
    <div className='CurrentGameListItem'>
    <p>{gameName}</p>
    </div>
  )
}

export default CurrentGameListItem

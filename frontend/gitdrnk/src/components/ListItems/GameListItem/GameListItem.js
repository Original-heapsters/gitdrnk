import React from 'react'
import './Styles/GameListItem.scss'
import InteractionButton from '../../InteractionButton/InteractionButton'

const GameListItem = ({gameTitle}) => {
  const gameName = gameTitle || 'testGame'
  return (
    <div className='GameListItemContainer'>
      <div className='GameListItem'>
        <p>{gameName}</p>
      </div>
      <InteractionButton style='float: right' text='Join'/>
    </div>
  )
}

export default GameListItem

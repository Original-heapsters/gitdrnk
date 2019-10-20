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
      <div className='GameListItem-JoinButton'>
          <InteractionButton text='Join'/>
      </div>
    </div>
  )
}

export default GameListItem

import React from 'react'
import './Styles/GameListItem.scss'
import InteractionButton from '../../InteractionButton/InteractionButton'

const GameListItem = ({gameTitle, joinCallback}) => {
  const gameName = gameTitle || 'testGame'
  return (
    <div className='GameListItemContainer'>
      <div className='GameListItem'>
        <p>{gameName}</p>
      </div>
      <div className='GameListItem-JoinButton'>
          <InteractionButton text='Join' clickCB={() => joinCallback(gameName)}/>
      </div>
    </div>
  )
}

export default GameListItem

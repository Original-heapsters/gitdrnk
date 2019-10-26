import React from 'react'
import './Styles/CurrentGameListItem.scss'

const CurrentGameListItem = ({gameTitle}) => {
  return (
    <div className='CurrentGameListItem'>
    <p>{gameTitle}</p>
    </div>
  )
}

export default CurrentGameListItem

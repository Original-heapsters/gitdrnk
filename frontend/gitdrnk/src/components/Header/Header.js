import React from 'react'
import './Styles/Header.scss'

const Header = ({gameTitle}) => {
  const gameName = gameTitle || 'testGame'
  return (
    <div className='Header'>
    <p>{gameName}</p>
    </div>
  )
}

export default Header

import React from 'react'
import './Styles/TopBar.scss'
import MainProfile from '../components/MainProfile/MainProfile'
import Header from '../components/Header/Header'
import Logo from '../components/Logo/Logo'

const TopBar = () => {
  return (
    <div className='TopBar'>
      <div className='TopBar-MainProfile'>
        <MainProfile/>
      </div>
      <div className='TopBar-Header'>
        <Header/>
      </div>
      <div className='TopBar-Logo'>
        <Logo/>
      </div>
    </div>
  )
}

export default TopBar

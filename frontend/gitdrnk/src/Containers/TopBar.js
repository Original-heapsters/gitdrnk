import React from 'react'
import './Styles/TopBar.scss'
import MainProfile from '../components/MainProfile/MainProfile'
import Header from '../components/Header/Header'
import Logo from '../components/Logo/Logo'

const TopBar = ({profilePicture, uName, uEmail, title, onLogin}) => {
  return (
    <div className='TopBar'>
      <div className='TopBar-MainProfile'>

        <MainProfile
        profilePicLink={profilePicture}
        username={uName}
        userEmail={uEmail}
        loginCB={onLogin}/>
      </div>
      <div className='TopBar-Header'>
        <Header
        gameTitle={title}/>
      </div>
      <div className='TopBar-Logo'>
        <Logo/>
      </div>
    </div>
  )
}

export default TopBar

import React, {useState} from 'react'
import './Styles/MainProfile.scss'
import InteractionButton from '../InteractionButton/InteractionButton'

const MainProfile = ({profilePicLink, username, userEmail, loginCB}) => {
  const [name, setEmail] = useState("");

  const getProfile = (profile, userName, userEmail) => {
    if(userName !== null && userEmail !== null){
      return (
          <>
            <img className='MainProfileAvatar' src={profile} alt="Avatar"/>
            <div className='MainProfileUserInfo'>
            <p>{userName}</p>
            <p>{userEmail}</p>
            </div>
          </>
        );
    } else{
      return (
        <div className='MainProfileUserInfo'>
          <input
            type='text'
            placeholder='Enter your git email address'
            value={name}
            onChange={e => setEmail(e.target.value)}/>
          <InteractionButton text='Sign In' clickCB={() => {loginCB(name)}}/>
        </div>
      );
    }
  }

  return (
    <div className='MainProfile'>
      {getProfile(profilePicLink, username, userEmail)}
    </div>
  )
}

export default MainProfile

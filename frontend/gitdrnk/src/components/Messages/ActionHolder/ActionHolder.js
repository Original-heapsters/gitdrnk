import React from 'react'
import './Styles/ActionHolder.scss'
import SmallProfile from '../../SmallProfile/SmallProfile'
import ActionAcknowledgement from '../../ActionAcknowledgements/ActionAcknowledgement'
import AvailableActionAcknowledgement from '../../ActionAcknowledgements/AvailableActionAcknowledgement'

const ActionHolder = ({points, profilePic, user, claimed, rule, consequence, timestamp}) => {
  const pointVal = points || 5
  const time = timestamp || '2019-4-20 04:20:69'
  const title = rule || 'Post Merge'
  const conseq = consequence || 'Take a sip!'
  const isClaimed = claimed || false
  return (
    <div className='ActionHolder'>
      <div className='ActionHolder-Indicator'>
        {isClaimed ?
          <ActionAcknowledgement pointValue={pointVal}/> :
          <AvailableActionAcknowledgement pointValue={pointVal}/>
        }
      </div>
      <div className='ActionHolder-Rule'>
        <p>{title}</p>
      </div>
      <div className='ActionHolder-Consequence'>
        <p>{conseq}</p>
      </div>
      <div className='ActionHolder-User'>
        <SmallProfile profilePicLink={profilePic} username={user} />
      </div>
      <div className='ActionHolder-Timestamp'>
      <p>{time}</p>
      </div>
    </div>
  )
}

export default ActionHolder

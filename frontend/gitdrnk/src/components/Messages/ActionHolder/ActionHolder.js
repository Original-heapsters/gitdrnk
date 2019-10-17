import React from 'react'
import './Styles/ActionHolder.scss'
import SmallProfile from '../../SmallProfile/SmallProfile'
import ActionAcknowledgement from '../../ActionAcknowledgements/ActionAcknowledgement'
import AvailableActionAcknowledgement from '../../ActionAcknowledgements/AvailableActionAcknowledgement'

const ActionHolder = ({claimed, rule, consequence, timestamp}) => {
  const time = timestamp || '2019-4-20 04:20:69'
  const title = rule || 'Post Merge'
  const conseq = consequence || 'Take a sip!'
  const isClaimed = claimed || false
  return (
    <div className='ActionHolder'>
      <div className='ActionHolder-Indicator'>
        {isClaimed ?
          <ActionAcknowledgement/> :
          <AvailableActionAcknowledgement/>
        }
      </div>
      <div className='ActionHolder-Rule'>
        <p>{title}</p>
      </div>
      <div className='ActionHolder-Consequence'>
        <p>{conseq}</p>
      </div>
      <div className='ActionHolder-User'>
        <SmallProfile />
      </div>
      <div className='ActionHolder-Timestamp'>
      <p>{time}</p>
      </div>
    </div>
  )
}

export default ActionHolder

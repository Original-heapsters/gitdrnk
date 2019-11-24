import React from 'react'
import './Styles/ActionAcknowledgement.scss'

const ActionAcknowledgement = ({pointValue}) => {
  const pointText = pointValue || '5'
  return (
    <div className='ActionAcknowledgement'>
      <p>+{pointText} Pts</p>
    </div>
  )
}

export default ActionAcknowledgement

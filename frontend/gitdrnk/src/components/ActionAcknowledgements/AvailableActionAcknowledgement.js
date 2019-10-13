import React from 'react'
import './Styles/AvailableActionAcknowledgement.scss'

const AvailableActionAcknowledgement = ({pointValue}) => {
  const pointText = pointValue || '5'
  return (
    <div className='AvailableActionAcknowledgement'>
    <p>+{pointText} Pts</p>
    </div>
  )
}

export default AvailableActionAcknowledgement

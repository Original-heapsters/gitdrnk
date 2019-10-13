import React from 'react'
import './Styles/EmptyActionAcknowledgement.scss'

const EmptyActionAcknowledgement = ({pointValue}) => {
  const pointText = pointValue || '5'
  return (
    <div className='EmptyActionAcknowledgement'>
      <p>+{pointText} Pts</p>
    </div>
  )
}

export default EmptyActionAcknowledgement

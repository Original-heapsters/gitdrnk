import React from 'react'
import './Styles/EmptyActionAcknowledgement.scss'

const EmptyActionAcknowledgement = ({pointValue}) => {
  const pointText = pointValue || '5 Pts'
  return (
    <div className='EmptyActionAcknowledgement'>
      <p className='ActionAcknowledgementsText'>{pointText}</p>
    </div>
  )
}

export default EmptyActionAcknowledgement

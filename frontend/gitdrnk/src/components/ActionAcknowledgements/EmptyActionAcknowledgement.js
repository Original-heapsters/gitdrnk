import React from 'react'
import './Styles/EmptyActionAcknowledgement.scss'

const EmptyActionAcknowledgement = ({pointValue, inverted}) => {
  const isInverted = inverted || false
  const pointText = pointValue || '5'
  if (isInverted){
      return (
        <div className='InvertedEmptyActionAcknowledgement'>
          <p>+{pointText} Pts</p>
        </div>
      )
  } else{
      return (
        <div className='EmptyActionAcknowledgement'>
          <p>+{pointText} Pts</p>
        </div>
      )
    }
}
export default EmptyActionAcknowledgement

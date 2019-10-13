import React from 'react'
import './Styles/InteractionButton.scss'

const InteractionButton = ({text}) => {
  const testText = text || 'Button Text';
  return (
          <div>
          <input className='InteractionButton' type='button' value={testText}/>
          </div>
  )
}

export default InteractionButton

import React from 'react'
import './Styles/InteractionButton.scss'

const InteractionButton = ({text, clickCB}) => {
  const testText = text || 'Button Text';
  return (
          <div>
          <input className='InteractionButton' type='button' value={testText} onClick={clickCB}/>
          </div>
  )
}

export default InteractionButton

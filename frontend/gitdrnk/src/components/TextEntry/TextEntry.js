import React from 'react'
import './Styles/TextEntry.scss'

const TextEntry = () => {
  return (
    <div className='TextEntryContainer'>
      <input className='TextEntryInput' type='text' name='entryArea' placeholder='Type your message and hit enter...'/>
    </div>
  )
}

export default TextEntry

import React from 'react'
import './Styles/TextEntry.scss'

const TextEntry = ({message, onChange, onMessage}) => {

  const textChanged = e => {
    onChange(e.target.value)
  }

  return (
    <div className='TextEntryContainer'>
      <form onSubmit={onMessage} className='TextEntryContainer'>
        <input className='TextEntryInput'
               type='text'
               name='entryArea'
               placeholder='Type your message and hit enter...'
               value={message}
               onChange={textChanged}/>
      </form>
    </div>
  )
}

export default TextEntry

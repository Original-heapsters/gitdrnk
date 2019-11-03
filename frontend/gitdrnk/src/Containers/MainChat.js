import React, {useState} from 'react'
import './Styles/MainChat.scss'
import TextEntry from '../components/TextEntry/TextEntry'
import ActionHolder from '../components/Messages/ActionHolder/ActionHolder'
import MessageHolder from '../components/Messages/MessageHolder/MessageHolder'
import {sendChatMessage} from '../util/SocketHelper.js'

const MainChat = ({gameId, email, actions, messages}) => {
  const [message, setMessage] = useState('')

  const actionList = actions || [
    {id:"1",claimed:true, rule:"Post Merge", consequence:"Take a sip!", timestamp:"2019-4-20 04:20:19.0"},
    {id:"2",claimed:true, rule:"Post Merge", consequence:"Take a sip!", timestamp:"2019-4-20 04:20:19.0"},
    {id:"3",claimed:true, rule:"Post Merge", consequence:"Take a sip!", timestamp:"2019-4-22 04:21:19.0"},
    {id:"4",claimed:false, rule:"Post Merge", consequence:"Take a sip!", timestamp:"2019-4-24 04:22:19.0"},
    {id:"5",claimed:true, rule:"Post Merge", consequence:"Take a sip!", timestamp:"2019-4-26 04:23:19.0"},
    {id:"6",claimed:false, rule:"Post Merge", consequence:"Take a sip!", timestamp:"2019-4-28 04:24:19.0"},
    {id:"7",claimed:false, rule:"Post Merge", consequence:"Take a sip!", timestamp:"2019-4-30 04:25:19.0"},
    {id:"8",claimed:true, rule:"Post Merge", consequence:"Take a sip!", timestamp:"2019-5-10 04:29:19.0"}
  ]


  const messageList = messages || [
    {_id:"9",message:"Cool", timestamp:"2019-4-21 04:20:50.0"},
    {_id:"10",message:"Cool1", timestamp:"2019-4-23 04:30:19.0"},
    {_id:"11",message:"Cool11", timestamp:"2019-4-26 04:31:19.0"},
    {_id:"12",message:"Cool111", timestamp:"2019-4-29 04:50:19.0"},
    {_id:"13",message:"Cool111", timestamp:"2019-4-31 04:59:19.0"},
    {_id:"14",message:"Cool1111", timestamp:"2019-5-01 04:35:19.0"},
    {_id:"15",message:"Cool11111", timestamp:"2019-5-03 04:36:19.0"}
  ]

  const mergeLists = (actions, messages) => {
    return actions
    .concat(messages)
    .sort((a,b) => {
      var left = new Date(a.timestamp);
      var right = new Date(b.timestamp);
      return left<right ? -1 : left>right ? 1 : 0;
    })
    // .sort((l, r) => {
    //   return Date.parse(l.timestamp) - Date.parse(r.timestamp)
    // })
    .map(messageEntry => {
      if ("action" in messageEntry && messageEntry.action != "join"){
        console.log(messageEntry)
        return <li key={messageEntry._id}>
                 <ActionHolder
                   profilePic={messageEntry.profile_picture}
                   user={messageEntry.username}
                   claimed={messageEntry.claimed}
                   rule={messageEntry.action}
                   consequence={messageEntry.consequence}
                   timestamp={messageEntry.date}
                   points={messageEntry.points}/>
               </li>
      } else{
        return <li key={messageEntry._id}>
                 <MessageHolder
                   profilePic={messageEntry.profile_picture}
                   user={messageEntry.username}
                   message={messageEntry.message}
                   timestamp={messageEntry.date}/>
               </li>
      }
    })
  }

  const messageSent = e => {
    e.preventDefault()
    sendChatMessage(gameId, email, message);
    console.log(message)
    setMessage('')

  }

  return (
    <div className='MainChat'>
      <div className='ChatWindow'>
        <ul className='ChatItemList'>
            { mergeLists(actionList, messageList) }
        </ul>
      </div>
      <div className='EntryArea'>
        <TextEntry message={message} onChange={setMessage} onMessage={messageSent}/>
      </div>
    </div>
  )
}

export default MainChat

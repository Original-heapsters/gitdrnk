import './Styles/Help.css';
import React from 'react';
import {getClientScripts} from '../util/APIHelper.js'

const Help = ({sessionInfo}) =>{
  console.log(sessionInfo.gameId);
  const scriptsRef = React.createRef();
  return (
    <div className='Help'>
      <a ref={scriptsRef} />
      <button onClick={()=> getClientScripts(scriptsRef.current, sessionInfo.gameId)}>Get Client Scripts</button>
    </div>
  );
};

export default Help;

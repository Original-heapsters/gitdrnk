import './Styles/Rules.css';
import React from 'react';
import Help from './Help.js'

const Rules = ({sessionInfo, ruleSet}) => {
  return (
    <div className="Rules">
      <ul>
        {ruleSet.map(ruleObj => {
          return (
           <li key={ruleObj.key}>
             <div>
               {ruleObj.key} | {ruleObj.rule}
             </div>
           </li>
         )
       })}
     </ul>
     <Help sessionInfo={sessionInfo} />
    </div>
  );
}

export default Rules;

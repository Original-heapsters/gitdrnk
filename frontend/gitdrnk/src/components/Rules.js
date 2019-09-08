import './Styles/Rules.css';
import React from 'react';

const Rules = ({ruleSet}) => {
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
    </div>
  );
}

export default Rules;

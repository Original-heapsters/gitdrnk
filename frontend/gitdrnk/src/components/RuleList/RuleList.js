import React from 'react';
import RuleCard from './RuleCard.js';

const RuleList = ({ruleSet, edittingRule, edittingRuleKey, ruleUpdated}) => {
  return (
    <div className="Rules">
      <ul className="Rules-list">
        {ruleSet.map(ruleObj => {
          return (
           <li key={ruleObj.key}>
              <RuleCard ruleObj={ruleObj} edittingRule={edittingRule} edittingRuleKey={edittingRuleKey} ruleUpdated={ruleUpdated}/>
           </li>
         )
       })}
     </ul>
    </div>
  );
}

export default RuleList;

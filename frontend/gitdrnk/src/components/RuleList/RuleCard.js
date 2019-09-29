import './Styles/RuleCard.scss'
import React from 'react';
import Rule from './Rule.js';
import EditRule from './EditRule.js';

const RuleCard = ({ruleObj, edittingRule, edittingRuleKey, ruleUpdated}) => {
  const rKey = ruleObj.key;
  const rVal = ruleObj.points;
  const rRule = ruleObj.rule;
  console.log(`${rKey} vs ${edittingRuleKey}`)
  return (
    <div className="RuleCard">
    {!edittingRule &&
      <div>
        <Rule rule={ruleObj}/>
        <button onClick={() => ruleUpdated(rKey, rVal, rRule)}>Edit Rule</button>
      </div>
    }
    {edittingRule && ruleObj.key == edittingRuleKey &&
      <div>
        <EditRule rule={ruleObj} ruleUpdated={ruleUpdated}/>
      </div>
    }
    </div>
  );
}
// <button onClick={() => ruleUpdated(rKey, rVal, rRule)}>Update Rule</button>

export default RuleCard;

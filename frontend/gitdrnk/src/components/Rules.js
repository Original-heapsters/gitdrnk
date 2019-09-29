import './Styles/Rules.css';
import React from 'react';
import Help from './Help.js'
import RuleList from './RuleList/RuleList.js'

const Rules = ({sessionInfo, ruleSet, edittingRule, edittingRuleKey, ruleUpdated}) => {
  return (
    <div className="Rules">
      <RuleList ruleSet={ruleSet} edittingRule={edittingRule} edittingRuleKey={edittingRuleKey} ruleUpdated={ruleUpdated}/>
      <Help sessionInfo={sessionInfo} />
    </div>
  );
}

export default Rules;

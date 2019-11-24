import React from 'react'
import './Styles/CollapsedRule.scss'
import EmptyActionAcknowledgement from '../../ActionAcknowledgements/EmptyActionAcknowledgement'

const CollapsedRule = ({ruleTitle, pointValue}) => {
  const ruleName = ruleTitle || 'testRule'
  return (
    <div className='CollapsedRule'>
      <div className='CollapsedRuleTitleContainer'>
        <p>{ruleName}</p>
      </div>
      <div className='CollapsedRulePointContainer'>
        <EmptyActionAcknowledgement pointValue={pointValue}/>
      </div>
    </div>
  )
}

export default CollapsedRule

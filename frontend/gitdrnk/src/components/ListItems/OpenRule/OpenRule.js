import React from 'react'
import './Styles/OpenRule.scss'
import EmptyActionAcknowledgement from '../../ActionAcknowledgements/EmptyActionAcknowledgement'

const OpenRule = ({ruleTitle, pointValue}) =>{
  const ruleName = ruleTitle || 'testRule'
  
  return (
    <div className='OpenRule'>
      <div className='OpenRuleTitleContainer'>
        <p>{ruleName}</p>
      </div>
      <div className='OpenRulePointContainer'>
        <EmptyActionAcknowledgement pointValue={pointValue} inverted={true}/>
      </div>
    </div>
  )
}

export default OpenRule

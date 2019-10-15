import React from 'react'
import './Styles/OpenRule.scss'
import EmptyActionAcknowledgement from '../../ActionAcknowledgements/EmptyActionAcknowledgement'
import InteractionButton from '../../InteractionButton/InteractionButton'

const OpenRule = ({ruleTitle, ruleDescription, ruleConsequence, pointValue}) =>{
  const ruleName = ruleTitle || 'testRule'
  const ruleDesc = ruleDescription || 'test rule description'
  const ruleConseq = ruleConsequence || 'test rule consequence'
  return (
    <div className='OpenRule'>
      <div className='OpenRuleHeader'>
        <div className='OpenRuleTitleContainer'>
          <p>{ruleName}</p>
        </div>
        <div className='OpenRulePointContainer'>
          <EmptyActionAcknowledgement pointValue={pointValue} inverted={true}/>
        </div>
      </div>
      <div className='OpenRuleBody'>
        <p>{ruleDesc}</p>
        <p>{ruleConseq}</p>
        <div className='OpenRuleBodyButtonContainer'>
          <InteractionButton text='Edit'/>
        </div>
      </div>
    </div>
  )
}

export default OpenRule

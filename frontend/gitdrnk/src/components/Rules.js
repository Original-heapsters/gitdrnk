import './Styles/Rules.css';
import React from 'react';

class Rules extends React.Component {
  render() {
    return (
      <div className="Rules">
      <ul>
        {this.props.ruleSet.map(ruleObj => {
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
}

export default Rules;

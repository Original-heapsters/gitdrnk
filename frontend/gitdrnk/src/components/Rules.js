import './Styles/Rules.css';
import React from 'react';

class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gameId: this.props.sessionInfo.gameId,
      ruleSet:[]}
  }

  componentDidMount() {
    const ruleEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/game/rules?game_id=' + this.state.gameId;
    fetch(ruleEndpoint)
      .then(response => response.json())
      .then(rules => this.setState({ ruleSet: rules.rules.definition }));
  }


  render() {
    return (
      <div className="Rules">
      <ul>
        {this.state.ruleSet.map(ruleObj => {
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

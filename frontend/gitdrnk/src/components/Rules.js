import './Styles/Rules.css';
import React from 'react';

class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {ruleSet:[]}
  }

  handleSubmit(e) {
    const ruleEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/game/rules';

    fetch(ruleEndpoint)
      .then(response => response.json())
      .then(rules => this.setState({ ruleSet: rules }));
    e.preventDefault();
  }

  getRules(){
    this.state.ruleSet.map(ruleset =>
    console.log(ruleset.rules));
    if (this.state.ruleSet.length > 0 ) {
      return (
        <table>
          <tbody>
            <tr>
              <th>Rule</th>
              <th>Effect</th>
            </tr>
            {this.state.ruleSet.map(ruleset =>
              ruleset.map( (key, value) =>
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              )
              )
            }
          </tbody>
        </table>
      );
    }
  }

  render() {
    const ruleDefinition = this.getRules();
    return (
      <div className="Rules">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Get All Games" />
        </form>
        {ruleDefinition}
      </div>
    );
  }
}

export default Rules;

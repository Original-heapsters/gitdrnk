import './Styles/Rules.css';
import React from 'react';

class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ruleSet:[]}
  }

  ComponentDidMount() {
    const ruleEndpoint = process.env.REACT_APP_GITDRNK_SVC + '/game/rules';

    fetch(ruleEndpoint)
      .then(response => response.json())
      .then(rules => this.setState({ ruleSet: rules }));
  }

  getRules(){
    if (this.state.ruleSet.length > 0 ) {
      return (
        <table>
          <tbody>
            <tr>
              <th>Rule</th>
              <th>Effect</th>
            </tr>
            {this.state.ruleSet.map((key, value) =>
              <tr>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
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

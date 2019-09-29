import React from 'react';

const EditRule = ({rule, ruleUpdated}) => {
    return (
      <div>
        <label>
          {rule.key}
        </label>
        <label>
          Rule:
          <input id="ruleInput" type="text" name="rule" value={rule.rule} />
        </label>
        <label>
          Point Value:
          <input id="rulePointInput" type="number" max="10" min="1" name="points" value={rule.points} />
        </label>
        <input type="submit" value="Submit" />
        <button onClick={() => {ruleUpdated(rule.key, document.getElementById("ruleInput").value, document.getElementById("rulePointInput").value)}}>Update</button>
      </div>
    );
}

export default EditRule;

import React from 'react';

const Rule = ({rule}) => {
    return (
      <div>
      {rule.key}
      {rule.rule}
      {rule.points}
      </div>
    );
}

export default Rule;

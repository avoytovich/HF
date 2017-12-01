export const checkType = (rules) => {
  const isIn = (obj, key) => obj && obj.hasOwnProperty(key);
  switch(true) {
    case isIn(rules, 'not'):
      return { label: 'not', key: 'not' };

    case isIn(rules, 'or'):
      return { label: 'or',  key: 'or' };

    case isIn(rules, 'and'):
      return { label: 'and', key: 'and' };

    case isIn(rules, 'match'):
      return { label: 'match', key: 'match' };

    default:
      return { label: 'rule', key: 'key'  };
  }
};
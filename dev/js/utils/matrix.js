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


export const genCharArray = () => {
  const charA = 'a', charZ = 'z';
  let result = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);

  for (; i <= j; ++i) {
    const char = String.fromCharCode(i);
    result.push(char.toUpperCase());
  }

  return result;
};
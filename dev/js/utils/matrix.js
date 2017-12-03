export const GROUP_TYPES = [
  { key: 'and',      type: 'block'},
  { key: 'or' ,      type: 'block'},
  { key: 'not',      type: 'block'},
  { key: 'match',    type: 'item'},
  { key: 'equal',    type: 'item'},
  { key: 'notEqual', type: 'item'}
];

export const TYPES = [
  { label: 'And',        value: 'and' },
  { label: 'Not',        value: 'not' },
  { label: 'Or',         value: 'or' },
  { label: 'Match',      value: 'match' },
  { label: 'Equal',      value: 'equal' },
  { label: 'Not Equal',  value: 'notEqual' },
];

export const mathType = (el) =>
  GROUP_TYPES.reduce((result, item) => {
    if (item) {
      return el.hasOwnProperty(item.key) ? item : result;
    }
    return result;
  }, {});


export const DEFAULT_ITEM_TYPE = 'equal';

export const findType = (el) =>
  GROUP_TYPES.reduce((result, item) =>
    item.key === el ? item.type : result, 'block');


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
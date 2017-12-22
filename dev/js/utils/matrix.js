export const GROUP_TYPES = [
  { key: 'and',      type: 'block'                    },
  { key: 'or' ,      type: 'block'                    },
  { key: 'not',      type: 'block'                    },
  { key: 'match',    type: 'item',  subType: 'single' },
  { key: 'equal',    type: 'item',  subType: 'single' },
  { key: 'notEqual', type: 'item',  subType: 'single' },
  { key: 'in',       type: 'item',  subType: 'list'   },
  { key: 'multiple', type: 'item',  subType: 'list'   },
  { key: 'true',     type: 'item',  subType: 'single' }
];

export const TYPES = [
  { label: 'And',        value: 'and'                           },
  { label: 'Not',        value: 'not'                           },
  { label: 'Or',         value: 'or'                            },
  { label: 'Match',      value: 'match',    subType: 'single'   },
  { label: 'Equal',      value: 'equal',    subType: 'single'   },
  { label: 'Not Equal',  value: 'notEqual', subType: 'single'   },
  { label: 'In',         value: 'in',       subType: 'single'   },
  { label: 'Multiple',   value: 'multiple', subType: 'multiple' }
];

export const TYPES_OPTIONAL = TYPES.concat(
  { label: 'Condition',  value: 'true', subType: 'single' }
);

export const DEF_ITEM = {
  key: '',
  op: '',
  value: []
};

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

    case isIn(rules, 'in'):
      return { label: 'in', key: 'in' };

    case isIn(rules, 'multiple'):
      return { label: 'multiple', key: 'multiple' };

    default:
      return { label: 'rule', key: 'key'  };
  }
};

export const checkIfBlockType = (type) =>
  GROUP_TYPES.reduce((result, item) => {
    if(item.type === 'block') {
      return true;
    }
    return result;
  }, false);

export const genCharArray = () => {
  const charA = 'a', charZ = 'z';
  let result = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);

  for (; i <= j; ++i) {
    const char = String.fromCharCode(i);
    result.push(char.toUpperCase());
  }

  return result;
};


export const checkQuestionType = (page) => {
  switch (page) {
    case 'diagnosis'  :
      return TYPES;

    case 'conditions'  :
    case 'evaluations' :
    case 'treatments' :
      return TYPES_OPTIONAL;

    default:
      return TYPES;
  }
};
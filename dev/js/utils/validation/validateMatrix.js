import validator from './validator';

import { bCN } from './index';



const LIST_OF_MULTI_LANG_FIELDS = ['question', 'single', 'multiple'];

const SIMPLE_STRING_RULES = {
  length: {
    minimum: 2,
  }
};

const SIMPLE_NUMBER_RULES = {
  numericality: {
    onlyInteger: true,
    greaterThanOrEqualTo: 0,
    lessThanOrEqualTo: 30,
  }
};

export const validateMatrix = data => {

  const multiLang = LIST_OF_MULTI_LANG_FIELDS.reduce((result, item) =>
    Object.assign(
      {},
      result,
      {
        [bCN(item, 'en')] : { ...SIMPLE_STRING_RULES },
        [bCN(item, 'swe')]: { ...SIMPLE_STRING_RULES },
      }
    ), {});

  const constraints = {
    ...multiLang,
    [bCN('range', 'from')]: {...SIMPLE_NUMBER_RULES},
    [bCN('range', 'to')]  : {...SIMPLE_NUMBER_RULES},
    questionTitle: {
      length: {
        minimum: 2,
        maximum: 80
      },
    },
  };

  const { isValid, errors } = validator(data, constraints);
  return {isValid, errors}
};

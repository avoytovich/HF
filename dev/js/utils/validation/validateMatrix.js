import validator from './validator';

import { bCN } from './index';

export const validateMatrix = data => {
  let constraints = {
    [bCN('question', 'en')]: {
      length: {
        minimum: 2,
      },
    },
    [bCN('question', 'swe')]: {
      length: {
        minimum: 2,
      },
    },
    [bCN('single', 'en')]: {
      length: {
        minimum: 2,
      },
    },
    [bCN('single', 'swe')]: {
      length: {
        minimum: 2,
      },
    },
    questionTitle: {
      length: {
        minimum: 2,
      },
    },
  };
  let { isValid, errors } =  validator(data, constraints);

  return {
    isValid,
    errors
  }
};

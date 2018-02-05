import validator from './validator';

import { store } from '../../index';
import { bCN } from './index';

export const validAssets = data => {

  let constraints = {
    [bCN('files', 'name')]: {
      length: {
        minimum: 2,
      },
    },
    [bCN('files', 'title')]: {
      length: {
        minimum: 2,
      },
    },
    [bCN('files', 'description')]: {
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

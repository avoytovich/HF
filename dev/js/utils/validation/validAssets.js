import validator from './validator';

import { store } from '../../index';
import { bCN } from './index';

export const validAssets = data => {

  let constraints = {
    [bCN('tmp_files', 'name_real')]: {
      length: {
        minimum: 2,
      },
    },
    [bCN('tmp_files', 'title')]: {
      length: {
        minimum: 2,
      },
    },
    [bCN('tmp_files', 'description')]: {
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

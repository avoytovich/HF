import validator from './validator';

import { store } from '../../index';
import { bCN } from './index';

const validateDay = data => {

  let constraints = {
    [bCN('tmp_files', 'name_real')]: {
      length: {
        minimum: 2,
      }
    },
    [bCN('tmp_files', 'title')]: {
      length: {
        minimum: 2,
      }
    },
    [bCN('tmp_files', 'description')]: {
      length: {
        minimum: 2,
      }
    },
  };

  let { isValid, errors } =  validator(
    { ...data, resetPasswordAttribute: store.getState().authReducer.password },
    constraints
  );

  return {
    isValid,
    errors
  }
};

export default validateDay;
import validator from './validator';

import { store } from '../../index';
import { bCN } from './index';

const validateBodyArea = data => {

  let constraints = {
    title: {
      presence: {
        message: "is required."
      },
      length: {
        minimum: 2,
      }
    },
    key: {
      presence: {
        message: "is required."
      },
      length: {
        minimum: 2,
      }
    }
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

export default validateBodyArea;
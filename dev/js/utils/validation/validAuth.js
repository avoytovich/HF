import validator from './validator';

import { store } from '../../index';
import { bCN } from './index';

const validateDay = data => {

  let constraints = {
    emails: {
      email: {
        message: "is not valid."
      },
    },
    password: {
      length: {
        minimum: 6,
      }
    },
    [bCN('emails', 'email')]: {
      email: {
        message: "is not valid."
      },
    },
    confirmPassword: {
      equality: {
        attribute: "resetPasswordAttribute",
        message: "should match the password.",
        comparator: (v1, v2) => JSON.stringify(v1) === JSON.stringify(v2)
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

export default validateDay;
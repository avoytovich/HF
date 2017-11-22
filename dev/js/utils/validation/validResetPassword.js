import validator from './validator';
import { store } from '../../index'

const validateResetPassword = data => {

  let constraints = {
    email         : {
      email: true
    },
    password      : {
      length: {
        minimum: 6,
      }
    },
    confirmPassword: {
      equality: {
        attribute : "resetPasswordAttribute",
        message: "should match the password.",
        comparator: (v1, v2) => JSON.stringify(v1) === JSON.stringify(v2)
      }
    }
  };

  let { isValid, errors } =  validator(
    { ...data, resetPasswordAttribute: store.getState().resetPasswordReducer.password },
    constraints
  );

  return {
    isValid,
    errors
  }
};

export default validateResetPassword;
import validate from 'validate.js';

const validator = (data, constraints) => {
  let errorsArrays = validate(data, constraints);
  let isValid      = validate.isEmpty(errorsArrays);
  let errors       = {};

  if (!isValid) {
    /**
     * Show only first error message - will not affect the ui (spaces between inputs in a form).
     * After first error is fixed by the user - next error will be shown if an input still has some
     */
    errors = Object.keys(errorsArrays).reduce((obj, error) => {
      obj[error] = errorsArrays[error][0];
      return obj;
    }, {});
  }

  return {
    isValid,
    errors
  }
};

export default validator;
import validate from 'validate.js';
import each from 'lodash/each';
import set from 'lodash/set';
import keys from 'lodash/keys';

// 'emails[1].email:"sdfeeffsdfr"'
/**
 * provides 'errors' object and 'isValid' boolean as props of a returned object
 * @param inputData: {object}
 * @param constraints: {object}
 * @return {{isValid: {boolean}, errors: {object}}}
 */
const validator = (inputData, constraints) => {
  let errorsArrays = [];

  each(keys(inputData), dataKey => {
    each(keys(constraints), constraintKey => {
      console.log(constraintKey.match('/'), dataKey.match(constraintKey));
      console.log(constraintKey, dataKey);
      if (constraintKey.match('/') && dataKey.match(constraintKey)) {
        let tempDataObj   = { 't': data[dataKey] };
        let tempCheckRule = { 't': constraints[constraintKey] };
        let errrrr = validate(tempDataObj, tempCheckRule);
        console.log(data[dataKey], constraints[constraintKey]);
        errorsArrays.concat(errrrr);
      }
    });
  });
  console.log(errorsArrays);

  // console.log(inputData, constraints);
  errorsArrays = validate(inputData, constraints);
  let isValid      = validate.isEmpty(errorsArrays);
  let errors       = {};
  console.log(errorsArrays);

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
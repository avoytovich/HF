import validate from 'validate.js';
import each from 'lodash/each';
import set from 'lodash/set';
import get from 'lodash/get';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize';

import { flattenObject } from '../index'

/**
 * provides 'errors' object and 'isValid' boolean as props of a returned object
 * @param inputDataReceived: {object}
 * @param constraints: {object}
 * @return {{isValid: {boolean}, errors: {object}}}
 */
const validator = (inputDataReceived, constraints) => {
  // if error - this validator return obj '{ [prop]: <Array>: array of errors }'
  let errorsObjOfArrays = {};
  let inputDataFlat     = flattenObject(inputDataReceived);
  let errors            = {};
  let isValid;

  // iterate over input data object
  each(keys(inputDataFlat), dataKey => {
    // iterate over rules object
    each(keys(constraints), constraintKey => {
      // if rule object prop name contains regex symbol and matches input data prop-path name - do validation
      if (constraintKey.match(/\^/) && dataKey.match(constraintKey)) {
        let tempDataObj         = { 't': inputDataFlat[dataKey] };
        let tempCheckRule       = { 't': constraints[constraintKey] };
        let validatedObjWithErr = validate(tempDataObj, tempCheckRule);
        if (validatedObjWithErr) {
          let errMessage = get(validatedObjWithErr, 't[0]')
            .replace('T ', `${capitalize(dataKey.split('.').pop())} `);
          set(errorsObjOfArrays, dataKey, errMessage);
        }
      }
    });
  });

  // merge validated nested objects with direct data object props
  errorsObjOfArrays = Object.assign(errorsObjOfArrays, validate(inputDataReceived, constraints));
  for ( let key in errorsObjOfArrays) {
    if (key.match(/\^/)) {
      delete errorsObjOfArrays[key]
    }
  }
  isValid = isEmpty(errorsObjOfArrays);

  if (!isValid) {
    errors = keys(errorsObjOfArrays).reduce((obj, error) => {
      obj[error] = typeof get(errorsObjOfArrays, `[${error}][0]`) === 'string' ?
        get(errorsObjOfArrays, `[${error}][0]`) :
        errorsObjOfArrays[error];
      return obj;
    }, {});
  }

  return {
    isValid,
    errors
  }
};

export default validator;
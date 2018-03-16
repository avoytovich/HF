import validator from './validator';

import { store } from '../../index';
import { bCN } from './index';

export const validateExercises = data => {

  let constraints = {
    [bCN('exercise', 'ordinal')]: {
      format: {
        pattern: "^([0-9]+[\.][0-9]+)$",
        message: "can only contain one dot and digits"
      }
    },
    // ordinal: {
    //   format: {
    //     pattern: "^[\d.]+$",
    //     flags: "i",
    //     message: "can only contain numbers"
    //   }
    // },
  };

  let { isValid, errors } =  validator(
    data,
    constraints
  );

  return {
    isValid,
    errors
  }
};

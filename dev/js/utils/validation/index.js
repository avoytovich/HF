import {
  AUTH,
  CREATE_QUESTION
} from '../../actions';

import validSignup from './validAuth';

export const validate = {
  [AUTH]            : validSignup,
  [CREATE_QUESTION] : validSignup,
};

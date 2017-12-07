import {
  AUTH,
  CREATE_QUESTION
} from '../../actions';

import validSignup from './validAuth';

export * from './bCN';

export const validate = {
  [AUTH]            : validSignup,
  [CREATE_QUESTION] : validSignup,
};

import {
  AUTH,
} from '../../actions';

import validSignup from './validAuth';

export const validate = {
  [AUTH]: validSignup,
};

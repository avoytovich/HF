import {
  SIGN_UP,
} from '../../actions';

import validSignup from './validSignup';

export const validate = {
  [SIGN_UP]: validSignup,
};

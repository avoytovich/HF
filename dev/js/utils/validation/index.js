import {
  AUTH,
  CREATE_QUESTION,
  ASSETS,
  CREATE_USERS
} from '../../actions';

import validSignup from './validAuth';
import { validAssets } from './validAssets';
import  validUsersCreation  from './validUserCreation';

export * from './bCN';

export { validAssets } from './validAssets';
export validUsersCreation  from './validUserCreation';

export const validate = {
  [AUTH]            : validSignup,
  [CREATE_QUESTION] : validSignup,
  [ASSETS]          : validAssets,
  [CREATE_USERS]    : validUsersCreation,
};

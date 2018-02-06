import { T ,PROFILE} from '../../actions';

import validSignup from './validAuth';
import { validAssets } from './validAssets';
import  validUsersCreation  from './validUserCreation';
import  validSimpleUsersCreation  from './validUserCreation';
import  validateTesting  from './validateTesting';
import { validateMatrix } from './validateMatrix';

export * from './bCN';

export { validAssets } from './validAssets';
export validUsersCreation  from './validUserCreation';
export validSimpleUsersCreation  from './validUserCreation';

export const validate = {
  [T.AUTH]            : validSignup,
  [T.ASSETS]          : validAssets,
  [T.CREATE_USERS]    : validUsersCreation,
  [T.CHAT]            : validUsersCreation,
  [T.CREATE_SIMPLE_USERS]    : validSimpleUsersCreation,
  [T.TESTING]         : validateTesting,
  [T.CREATE_QUESTION] : validateMatrix,
  [PROFILE]           : validSimpleUsersCreation,
};

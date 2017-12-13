import {
  AUTH,
  CREATE_QUESTION,
  ASSETS,
} from '../../actions';

import validSignup from './validAuth';
import { validAssets } from './validAssets';

export * from './bCN';

export { validAssets } from './validAssets';

export const validate = {
  [AUTH]            : validSignup,
  [CREATE_QUESTION] : validSignup,
  [ASSETS]          : validAssets,
};

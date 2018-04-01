import { T ,PROFILE} from '../../actions';

import validSignup from './validateAuth';
import { validAssets } from './validAssets';
import  validateUsersCreation  from './validateUserCreation';
import  validSimpleUsersCreation  from './validateUserCreation';
import validateTariffPlanCreation from './validateTariffPlanCreation'
import  validateTesting  from './validateTesting';
import { validateMatrix } from './validateMatrix';
import  validateAppInfo from './validateAppInfo';


export * from './bCN';

export { validAssets }          from './validAssets';
export validateUsersCreation    from './validateUserCreation';
export validSimpleUsersCreation from './validateUserCreation';
export validateBodyArea         from './validateBodyArea';
export { validateMatrix }       from './validateMatrix';
export { validateExercises }    from './validateExercises';


export const validate = {
  [T.AUTH]                  : validSignup,
  [T.ASSETS]                : validAssets,
  [T.CREATE_USERS]          : validateUsersCreation,
  [T.CHAT]                  : validateUsersCreation,
  [T.CREATE_SIMPLE_USERS]   : validSimpleUsersCreation,
  [T.TESTING]               : validateTesting,
  [T.CREATE_QUESTION]       : validateMatrix,
  [T.APP_INFO]              : validateAppInfo,
  [PROFILE]                 : validSimpleUsersCreation,
  [T.CREATE_TARIFF_PLAN]    :validateTariffPlanCreation,
  [T.CREATE_PRICING_GROUPS] :validateTariffPlanCreation,
  [T.SIMPLE_TARIFF_PLAN]    :validateTariffPlanCreation,
};

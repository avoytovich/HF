import {
  NEW_DAY,
} from '../../actions';

import validateDay from './validateDay';

export const validate = {
  [NEW_DAY]: validateDay,
};

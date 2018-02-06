import { createReducer } from '../../utils';
import { PROFILE } from '../../actions';

const initialState = {
  actionType:  PROFILE,
  errors: {},
};

const simpleUserProfileReducer = createReducer(initialState, PROFILE);

export default simpleUserProfileReducer

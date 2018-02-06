import { createReducer } from '../../utils';
import { PROFILE } from '../../actions';

const initialState = {
  actionType:  PROFILE,
  errors: {},
};

const profileReducer = createReducer(initialState, PROFILE);

export default profileReducer

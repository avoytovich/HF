import { createReducer } from '../../utils';
import { SIGN_UP } from '../../actions';

const initialState = {
  actionType: SIGN_UP,
  errors: {},
  email: '',
};

export const signupReducer = createReducer(initialState, SIGN_UP);

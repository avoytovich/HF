import { createReducer } from '../../utils';
import { AUTH } from '../../actions';

const initialState = {
  actionType: AUTH,
  errors: {},
  email: '',
  password: '',
  confirmPassword: '',
};

export const authReducer = createReducer(initialState, AUTH);

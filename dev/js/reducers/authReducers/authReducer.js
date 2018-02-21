import { createReducer } from '../../utils';
import { AUTH } from '../../actions';

const initialState = {
  actionType: AUTH,
  errors: {},
  email: '',
  password: '',
  confirmPassword: '',
  remember_me: true,
  showTwoFactorModal: false,
  twoFactorCode: '',
};

export const authReducer = createReducer(initialState, AUTH);

import { createReducer } from '../../utils';
import { ASSETS } from '../../actions';

const initialState = {
  actionType: ASSETS,
  errors: {},
  files: [],
};

export const authReducer = createReducer(initialState, ASSETS);

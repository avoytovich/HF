import { createReducer } from '../../utils';
import { ASSETS } from '../../actions';

const initialState = {
  actionType: ASSETS,
  errors: {},
  tmp_files: [],
};

export const assetsReducer = createReducer(initialState, ASSETS);

import { createReducer } from '../../utils';
import { ASSETS, ASSETS_DELETE } from '../../actions';

const initialState = {
  actionType: ASSETS,
  errors: {},
  tmp_files: [],
  progress: 100,
};

const assetsDelete = (state, action) => {
  let tmp_files = [...state.tmp_files];
  tmp_files.splice(action.payload, 1);
  return { ...state, tmp_files };
};

export const assetsReducer = createReducer(initialState, ASSETS, {
  [ASSETS_DELETE]: assetsDelete,
});

import { createReducer } from '../../utils';
import { ASSETS, ASSETS_DELETE } from '../../actions';

const initialState = {
  actionType: ASSETS,
  errors: {},
  files: [],
};

const assetsDelete = (state, action) => {
  let files = [...state.files];
  files.splice(action.payload, 1);
  return { ...state, files };
};

export const assetsReducer = createReducer(initialState, ASSETS, {
  [ASSETS_DELETE]: assetsDelete,
});

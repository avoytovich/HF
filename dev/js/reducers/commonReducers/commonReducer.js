import { COMMON } from '../../actions';
import { createReducer } from '../../utils';
const initialState = {
  isLoading  : 0,
  currentPath: ''
};

const commonReducer =  createReducer(initialState, COMMON);

export default commonReducer;


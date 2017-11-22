import { COMMON } from '../../actions';
import { createReducer } from '../../utils';

const initialState = {
  data      : [],
  pagination: {
    total       : 0,
    count       : 0,
    per_page    : 0,
    current_page: 0,
    total_pages : 0,
  }
};


export default createReducer(initialState, COMMON);
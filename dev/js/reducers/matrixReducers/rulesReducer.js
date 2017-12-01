import { COMMON } from '../../actions';
import { createReducer } from '../../utils';

const initialState = {
  question : {
    title : 'some text',
    answer: true
  },
};

export default createReducer(initialState, COMMON);
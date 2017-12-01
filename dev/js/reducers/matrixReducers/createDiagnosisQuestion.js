import { createReducer } from '../../utils';
import { AUTH } from '../../actions';

const initialState = {
  actionType: AUTH,
  question: '',
  errors: {
    question: 'eeeee'
  },
};

export default createReducer(initialState, AUTH);
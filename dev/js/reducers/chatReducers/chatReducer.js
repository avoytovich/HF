import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.CHAT,
  errors: {},
  message: '',
};

const chatReducer = createReducer(initialState, T.CHAT);

export default chatReducer

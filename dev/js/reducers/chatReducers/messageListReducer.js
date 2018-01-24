import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {};

const messageListReducer = createReducer(initialState, T.MESSAGE_LIST);

export default messageListReducer

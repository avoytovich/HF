import { createReducer } from '../../utils';
import { USER } from '../../actions';

const initialState = {};

const userReducer = createReducer(initialState, USER);

export default userReducer

import { createReducer } from '../../utils';
import { PROFILE } from '../../actions';

const initialState = {
};

const userReducer = createReducer(initialState, PROFILE);

export default userReducer

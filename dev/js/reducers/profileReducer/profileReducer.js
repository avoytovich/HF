import { createReducer } from '../../utils';
import { PROFILE } from '../../actions';

const initialState = {
};

const profileReducer = createReducer(initialState, PROFILE);

export default profileReducer

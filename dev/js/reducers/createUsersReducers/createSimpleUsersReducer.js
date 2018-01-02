import { createReducer } from '../../utils';
import { CREATE_SIMPLE_USERS } from '../../actions';

const initialState = {
  actionType: CREATE_SIMPLE_USERS,
  errors: {},
  email: "",
  customer_id: '',
  active: false
};

export const createSimpleUsersReducers = createReducer(initialState, CREATE_SIMPLE_USERS);

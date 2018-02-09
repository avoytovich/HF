import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.CREATE_SIMPLE_USERS,
  errors: {},
  email: "",
  customer_id: '',
  active: false,
  role:'',
  first_name:'',
  last_name:'',
};

export const createSimpleUsersReducers = createReducer(initialState, T.CREATE_SIMPLE_USERS);

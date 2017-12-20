import { createReducer } from '../../utils';
import { CREATE_USERS } from '../../actions';

const initialState = {
  actionType: CREATE_USERS,
  errors: {},
  name: '',
  type: '',
  tariff_id: '',
  email: '',
  entryFee: '',
  contact_info:{},
  billing_info:{},
  legal_info:{},
  additional_info:{},
  active:false,
};

export const createUsersReducers = createReducer(initialState, CREATE_USERS);

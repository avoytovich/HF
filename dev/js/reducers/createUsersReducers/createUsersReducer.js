import { createReducer } from '../../utils';
// import { AUTH } from '../../actions';

const initialState = {
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

export const createUsersReducers = createReducer(initialState);

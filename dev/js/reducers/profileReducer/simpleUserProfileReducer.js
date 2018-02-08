import { createReducer } from '../../utils';
import { PROFILE } from '../../actions';

const initialState = {
  actionType: "PROFILE",
  errors: {},
  user_id:'',
  customer_id: '',
  created_at: '',
  updated_at: '',
  confirmed_at: '',
  activated_at: '',
  deactivated_at: '',
  deleted_at: '',
  info_provided_at: '',
  customer_role: '',
  first_name: "",
  last_name: "",
  country: '',
  city: '',
  language: '',
  blocked_at: '',
  email: '',

};

const simpleUserProfileReducer = createReducer(initialState, PROFILE);

export default simpleUserProfileReducer

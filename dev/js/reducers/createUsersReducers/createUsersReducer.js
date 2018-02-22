import { createReducer } from '../../utils';
import { CREATE_USERS } from '../../actions';

const initialState = {
  actionType: CREATE_USERS,
  errors: {},
  name: "",
  type: "",
  email: "",
  entryFee: "",
  contact_info: {
    address: "",
    region: "",
    country: "",
    postal_code: "",
    contacts: [
      {
        name: "",
        surname: "",
        email: "",
        phone: ""
      },
      {
        name: "",
        surname: "",
        email: "",
        phone: ""
      }
    ]
  },
  billing_info: {
    address: "",
    region: "",
    country: "",
    postal_code: "",
    stripe_token: "",
    card: {
      number: "",
      exp_month: "",
      exp_year: "",
      cvc: ""
    }
  },
  legal_info: {
    vat: "",
    reg_num: ""
  },
  additional_info: {
    // employees_number: "",
    industry: ""
  },
  active: false
};

export const createUsersReducers = createReducer(initialState, CREATE_USERS);

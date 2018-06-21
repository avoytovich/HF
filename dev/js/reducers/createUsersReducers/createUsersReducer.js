import { createReducer } from '../../utils';
import {CREATE_QUESTION, CREATE_USERS} from '../../actions';
import set from 'lodash/set';

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
  legal_info: [],
  additional_info: [],
  active: false
};

const createUserUpdate = (state, action) => {
  switch (action.type) {
    case `${CREATE_USERS}_UPDATE`:
      const {data, path } = action.payload;
      const res =  set(state, path, data);
      return Object.assign({}, res);
    default:
      return state;
  }
};

export const createUsersReducers = createReducer(Object.assign({}, initialState), CREATE_USERS, {
  [`${CREATE_USERS}_UPDATE`]: createUserUpdate
});

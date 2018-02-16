import { createReducer } from '../../utils';
import { PROFILE } from '../../actions';

const initialState = {
  "billing_info": {
    "address": "",
    "region": "",
    "country": "",
    "stripe_token": "",
    "card": {
      "number": "",
      "exp_month": "",
      "exp_year": "",
      "cvc": ""
    }
  },
};

const profileReducer = createReducer(initialState, PROFILE);

export default profileReducer

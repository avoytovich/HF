import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.CREATE_TARIFF_PLAN,
  errors: {},
  name: '',
  customer_type: '',
  tariff_type: '',
  subscription_fee: '',
  cost_per_user:'',
  period:'',
  pricing_groups: [
    {key:'',
     price:''
  }
  ],
  properties:{
    free_period: ''
  }
};

export const createTariffPlanReducer = createReducer(initialState, T.CREATE_TARIFF_PLAN);

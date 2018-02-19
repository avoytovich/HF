import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.SIMPLE_TARIFF_PLAN,
  errors: {},
  name: '',
  customer_type: '',
  tariff_type: '',
  subscription_fee: '',
  cost_per_user:'',
  period:'',
};

export const simpleTariffPlanReducer = createReducer(initialState, T.SIMPLE_TARIFF_PLAN);

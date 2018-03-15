import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.CREATE_PRICING_GROUPS,
  errors: {},
  title:'',
  key:'',
};

export const createPricingGroupReducer = createReducer(initialState, T.CREATE_PRICING_GROUPS);

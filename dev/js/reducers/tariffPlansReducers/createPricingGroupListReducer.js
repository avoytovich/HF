import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
};

export const createPricingGroupListReducer = createReducer(initialState, T.CREATE_PRICING_GROUPS_LIST);

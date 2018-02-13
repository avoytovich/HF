import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.CREATE_TARIFF_PLAN,
  errors: {},
  title: "",
  type: '',
  price: '',
  cost:'',
  period:'',
};

export const createTariffPlanReducer = createReducer(initialState, T.CREATE_TARIFF_PLAN);

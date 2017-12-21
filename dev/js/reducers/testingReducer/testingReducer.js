import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.TESTING,
  errors: {},
};

export const testingReducer = createReducer(initialState, T.TESTING);

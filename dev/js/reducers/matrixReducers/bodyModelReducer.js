import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.BODY_MODEL,
  errors: {},
  shapes:{
    features: [],
  },
};

export const bodyModelReducer = createReducer(initialState, T.BODY_MODEL);

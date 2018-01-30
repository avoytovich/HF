import { createReducer } from '../../utils';
import { T } from '../../actions';
import { assets } from '../../config';

const initialState = {
  actionType: T.BODY_MODEL,
  errors: {},
  polygons:{},
  side    : 'front',
  sex     : 'male',
};

export const bodyModelReducer = createReducer(initialState, T.BODY_MODEL);

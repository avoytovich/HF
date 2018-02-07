import omit from 'lodash/omit';

import { createReducer } from '../../utils';
import { T } from '../../actions';
import { assets } from '../../config';

const initialState = {
  actionType: T.BODY_MODEL,
  errors                 : {},
  currentlyDrawingPolygon: {},
  existingPolygons       : [],
  side                   : 'front',
  sex                    : 'male',
  tab                    : 0,
  //
  showEditTool           : true,
  showPolygonTool        : true,
};

const deletePolygon = (state, action) => omit(state, action.payload);

export const bodyModelReducer = createReducer(initialState, T.BODY_MODEL, {
  [T.BODY_MODEL_DELETE_POLYGON]: deletePolygon,
});

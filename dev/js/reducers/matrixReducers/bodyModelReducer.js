import { createReducer } from '../../utils';
import { T } from '../../actions';
import { assets } from '../../config';

const initialState = {
  actionType: T.BODY_MODEL,
  errors                 : {},
  currentlyDrawingPolygon: {},
  existingPolygons       : {},
  side                   : 'front',
  sex                    : 'male',
  tab                    : 0,
  //
  showEditTool           : true,
  showPolygonTool        : true,
};

export const bodyModelReducer = createReducer(initialState, T.BODY_MODEL);

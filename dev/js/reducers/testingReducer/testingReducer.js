import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.TESTING,
  errors: {},
  bodyAreas: [],
  bodyAreasIds: [],
  type: 'diagnostic',
  step: 0,
  title: '',
  q_lang: { value: '', type: 'single' },
  q_metric: { value: '', type: 'single' },
  q_age: { value: '', type: 'single' },
  q_sex: { value: '', type: 'single' },
  q_weight: { value: '', type: 'single' },
  q_height: { value: '', type: 'single' },
  q_pregnant: { value: '', type: 'single' },
};

const testingBodyAresIds = (state, action) => {
  let bodyAreas = action.payload.map(({ title, id }) => ({
    label: title,
    value: { id, title },
  }));
  return { ...state, bodyAreas }
};

export const testingReducer = createReducer(initialState, T.TESTING, {
  [T.TESTING_BODY_AREAS_IDS]: testingBodyAresIds
});

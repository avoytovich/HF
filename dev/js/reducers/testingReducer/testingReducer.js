import get from 'lodash/get';
import set from 'lodash/set';
import remove from 'lodash/remove';

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
  //
  questions: []
};

const testingBodyAres = (state, action) => {
  let bodyAreas = action.payload.map(({ title, id }) => ({
    label: title,
    value: { id, title },
  }));
  return { ...state, bodyAreas }
};

const testingAddQuestions = (state, action) => {
  let questions = [...state.questions];
  questions     = questions.concat(action.payload);
  return { ...state, questions };
};

const testingAddMultOption = (state, action) => {
  const {
    path,
    answerId,
  } = action.payload;
  let multiQAnswers = get(state, path, []);
  multiQAnswers.push(answerId);
  return set({...state}, path, multiQAnswers);
};

const testingDeleteMultOption = (state, action) => {
  const {
    path,
    answerId,
  } = action.payload;
  let multiQAnswers = get(state, path, []);
  remove(multiQAnswers, val => val === answerId);
  return set({...state}, path, multiQAnswers);
};

export const testingReducer = createReducer(initialState, T.TESTING, {
  [T.TESTING_BODY_AREAS]        : testingBodyAres,
  [T.TESTING_ADD_QUESTIONS]     : testingAddQuestions,
  [T.TESTING_ADD_MULT_OPTION]   : testingAddMultOption,
  [T.TESTING_DELETE_MULT_OPTION]: testingDeleteMultOption,
});

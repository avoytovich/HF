import get from 'lodash/get';
import each from 'lodash/each';
import set from 'lodash/set';
import find from 'lodash/find';
import remove from 'lodash/remove';

import { createReducer } from '../../utils';
import { T } from '../../actions';

const initialState = {
  actionType: T.TESTING,
  errors: {},
  bodyAreas: [],
  bodyAreasPicked: [],
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
  questions: [],
  conditions: [],
};

const testingBodyAres = (state, action) => {
  let bodyAreas = [];
  each(action.payload, (val, answerId) => {
    bodyAreas.push({
      label: val.en,
      value: { id: answerId, title: val.en },
    });
  });
  return { ...state, bodyAreas };
};

const testingAddQuestionsAndCond = (state, action) => {
  let questions     = [...state.questions];
  let conditions    = [...state.conditions];
  let step          = action.payload.step;
  let id            = action.payload.id;
  let result_status = action.payload.result_status;
  each(action.payload.questions, (q, p) => q.step = step);
  each(action.payload.conditions, (c, p) => c.step = step);
  questions      = questions.concat(action.payload.questions);
  each(action.payload.conditions, (val, prop) => {
    if (!find(conditions, ({ key }) => key === prop)) {
      conditions.push({ ...val, key: prop })
    }
  });

  return { ...state, questions, conditions, step, testId: id, result_status };
};

const testingAddMultOption = (state, action) => {
  const {
    path,
    answerId,
    id,
  } = action.payload;
  let multiQAnswers = get(state, path, []);
  multiQAnswers.push(answerId);
  return { ...set({...state}, path, multiQAnswers), [id]: 'multiple' };
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
  [T.TESTING_ADD_QUESTIONS_AND_COND]     : testingAddQuestionsAndCond,
  [T.TESTING_ADD_MULT_OPTION]   : testingAddMultOption,
  [T.TESTING_DELETE_MULT_OPTION]: testingDeleteMultOption,
});

import get from 'lodash/get';
import each from 'lodash/each';
import map from 'lodash/map';
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
  start_conditions: [],
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
  changingQuestionStep: 0,
  testId: null,
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
  let questions = [...state.questions];
  let conditions = [...state.conditions];
  let questionsFromBackToArray = [];
  let {
    step,
    id,
    result_status,
    condition,
    treatments,
  } = action.payload;

  // due to unpredictable changes on the backend
  if (!Array.isArray(action.payload.questions)) {
    questionsFromBackToArray = map(action.payload.questions, (q, key) => q);
  } else {
    questionsFromBackToArray = action.payload.questions
  }

  // add step property to incoming conditions - to know on which step
  // each of them has come
  each(action.payload.conditions, (c, p) => c.step = step);

  // concat existing questions with incoming ones from the backend
  questions = questions.concat(questionsFromBackToArray);

  // concat incoming conditions filtering out ones we already have
  each(action.payload.conditions, (val, prop) => {
    if (!find(conditions, ({ key }) => key === prop)) {
      conditions.push({ ...val, key: prop })
    }
  });

  // when we're receiving result - need to increment step to fire change step subscription
  // when changing some previous questions - to unblock testing and receive new result
  const finalStep = result_status ? +step + 1 : +step;

  return {
    ...state,
    questions,
    conditions,
    testId: id,
    result_status,
    condition,
    treatments,
    step                : finalStep,
    changingQuestionStep: finalStep,
  };
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

const testingRemoveOverstepQuestionsAndCond = (state, action) => {
  let testingReducer   = { ...state };
  let questions        = [...state.questions];
  let conditions       = [...state.conditions];
  let controlStep      = action.payload;
  let removedQuestions = remove(questions, q => q.step > controlStep);

  remove(conditions, c => c.step > controlStep);
  each(testingReducer, (value, key) => {
    each(removedQuestions, q => {
      if (q.key === key) {
        delete testingReducer[key]
      }
    });
  });

  return { ...testingReducer, questions, conditions, step: controlStep };
};

export const testingReducer = createReducer(initialState, T.TESTING, {
  [T.TESTING_BODY_AREAS]                        : testingBodyAres,
  [T.TESTING_ADD_QUESTIONS_AND_COND]            : testingAddQuestionsAndCond,
  [T.TESTING_ADD_MULT_OPTION]                   : testingAddMultOption,
  [T.TESTING_DELETE_MULT_OPTION]                : testingDeleteMultOption,
  [T.TESTING_REMOVE_OVERSTEP_QUESTIONS_AND_COND]: testingRemoveOverstepQuestionsAndCond,
});

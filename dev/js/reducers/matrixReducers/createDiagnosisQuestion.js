import { createReducer }   from '../../utils';
import { CREATE_QUESTION } from '../../actions';
import set                 from 'lodash/set';

const initialState = {
  actionType    : CREATE_QUESTION,
  bodyAreas     : '', // {label: 'body', value: 'body'},
  question      : '',
  questionType  : 'diagnostic',
  questionKey   : '',
  sequence      : 1,
  sequenceType  : '',
  answerType    : 'single',
  single  : [
      undefined,
      undefined,
    ],
  multiple: [
      undefined,
      undefined,
    ],
  range   : {
      from: 0,
      to: 100
    },
  errors: {},
};

const createQuestionUpdate = (state, action) => {
  switch (action.type) {
    case `${CREATE_QUESTION}_UPDATE`:
      const {data, path } = action.payload;
      return set(state, path, data);
    default:
      return state;
  }

};

export default createReducer(initialState, CREATE_QUESTION, {
  [`${CREATE_QUESTION}_UPDATE`]: createQuestionUpdate,
});

//export default(state = initialState, action = CREATE_QUESTION) => {
//  switch (action.type) {
//
//    case `${CREATE_QUESTION}_UPDATE`:
//      const {data, path } = action.payload;
//      return set(state, path, data);
//
//    default:
//      return state;
//  }
//};
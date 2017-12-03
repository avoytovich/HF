import { createReducer }   from '../../utils';
import { CREATE_QUESTION } from '../../actions';
import set                 from 'lodash/set';
import get                 from 'lodash/get';
import * as dotProp        from 'dot-prop-immutable';

const initialState = {
  actionType    : CREATE_QUESTION,
  bodyAreas     : '', // {label: 'body', value: 'body'},
  question      : 'Are you pregnant ?',
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

  rules: [],
  errors: {},
};

const createQuestionUpdate = (state, action) => {
  switch (action.type) {
    case `${CREATE_QUESTION}_UPDATE`:
      const {data, path } = action.payload;
      const res =  set(state, path, data);
      return Object.assign({}, res);

    default:
      return state;
  }

};

const createQuestionRules = (state, action) => {
  const {path, type, body} = action.payload;
  const rules = get(state, path);
  const template = {
    [type] : body
  };
  return Object.assign({}, set(state, path, rules.concat(template)));
};

const changeType = (state, action) => {
  const {path, oldProp, newProp } = action.payload;
  return dotProp.set(state, path, value => {
    const propsBody = value[oldProp];
    delete value[oldProp];
    return Object.assign({}, value, {[newProp]: propsBody});
  });
};

export default createReducer(initialState, CREATE_QUESTION, {
  [`${CREATE_QUESTION}_UPDATE`]       : createQuestionUpdate,
  [`${CREATE_QUESTION}_ADD_RULE`]     : createQuestionRules,
  [`${CREATE_QUESTION}_CHANGE_TYPE`]  : changeType,
});

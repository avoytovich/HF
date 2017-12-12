import { createReducer }   from '../../utils';
import { CREATE_QUESTION } from '../../actions';
import set                 from 'lodash/set';
import get                 from 'lodash/get';
import isEmpty             from 'lodash/isEmpty';
import * as dotProp        from 'dot-prop-immutable';

const initialState = {
  actionType    : CREATE_QUESTION,
  bodyAreas     : '', // {label: 'body', value: 'body'},\
  questionTitle : '',
  question: {
    en: '',
    swe: ''
  },
  questionKey   : '',
  sequence      : 1,
  sequenceType  : 'normal',
  answerType    : 'single',
  single  : [
      { en: '', swe: ''},
      { en: '', swe: ''}
    ],
  multiple: [
      { en: '', swe: ''},
      { en: '', swe: ''}
    ],
  range   : {
      from: 0,
      to: 100
    },

  rules: [],
  treatmentsLevels: '',
  treatmentsPackage: '',
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

const addDefaultGroupRule = (state, action) => {
  const { type, path, body } = action.payload;
  return dotProp.set(
    state,
    `${path}.${type}`,
    body
  );
};

const changeToItemRule = (state, action) => {
  const {  path, body } = action.payload;
  return dotProp.set(
    state,
    `${path}`,
    body
  );
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


const recDelete = (state, path) => {
  const _path  = path.split('.').slice(0, -1);
  const hasItems = dotProp.get(state,`${_path.join('.')}`);

  if (path !== 'rules' && !hasItems.length) {
    const _state = dotProp.delete(state, _path);

    return _state.rules &&_state.rules.length ?
      recDelete(_state, _path.join('.')) :
      dotProp.set(_state, 'rules', []);
  }
  else {
    return state;
  }
};

const deleteRule = (state, action) => {
  const {path, key } = action.payload;
  const result = dotProp.delete(state, `${path}`);
  return recDelete(result, path)
};

const setQuestion = (state, action) => {
  const {path, type, item, property} = action.payload;
  return dotProp.set(
    state,
    `${path}.${type}`,
    (value) => {
      const _value = value[0];
      const result = property ?
        Object.assign({}, _value, {[property]: item}):
        Object.assign({}, _value, item);
      return [result]
    }
  );
};

const addNewAnswer = (state, action) => {
  const { type } = action.payload;
  return dotProp.set(
    state,
    type,
    value => value.concat({ en: '', swe: ''}))
};

const removeAnswer = (state, action) => {
  const { type, index } = action.payload;
  return dotProp.set(
    state,
    type,
    value => {
      const length = value.length;
      if (length <= 2) {
        return value;
      }
      else {
        return value.filter((item, i) => index !== i);
      }
    });
};

const setFullQuestion = (state, action) => {
  const { body: { area, title, question, key, step, answer, rule }} = action.payload;
  const { subtype, type } = answer;
  const _type = subtype === 'range' || type === 'range' ? 'range' : type

    const _body = {
      bodyAreas: { key: area, label:area, title: area },
      questionTitle: title,
      question,
      sequence: step,
      questionKey: key,
      answerType: _type,
      rules: rule,
      [_type]: parseAnswers(answer)
//      sequenceType: null,
    };
  return Object.assign({}, state, _body);
};


const parseAnswers= (answer) => {
  if (answer.type === 'range') {
    const {max, min} = answer.values;
    return {
      from: min,
      to: max
    };
  }
  else if (answer.subtype === 'range') {
    const { max, min } = answer;
    return {
      from: min,
      to: max
    };
  }
  else  {
    const list = answer.values;
    return Object.keys(list).map(item => list[item]);
  }
};
export default createReducer(initialState, CREATE_QUESTION, {
  [`${CREATE_QUESTION}_UPDATE`]              : createQuestionUpdate,
  [`${CREATE_QUESTION}_ADD_RULE`]            : createQuestionRules,
  [`${CREATE_QUESTION}_CHANGE_TYPE`]         : changeType,
  [`${CREATE_QUESTION}_ADD_DEF_GROUP_RULE`]  : addDefaultGroupRule,
  [`${CREATE_QUESTION}_CHANGE_TO_ITEM_RULE`] : changeToItemRule,
  [`${CREATE_QUESTION}_DELETE_ITEM`]         : deleteRule,
  [`${CREATE_QUESTION}_SET_QUESTION`]        : setQuestion,
  [`${CREATE_QUESTION}_ADD_NEW_ANSWER`]      : addNewAnswer,
  [`${CREATE_QUESTION}_REMOVE_ANSWER`]       : removeAnswer,
  [`${CREATE_QUESTION}_SET_FULL_QUESTION`]   : setFullQuestion,
});

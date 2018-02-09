import { createReducer }   from '../../utils';
import { CREATE_QUESTION } from '../../actions';
import set                 from 'lodash/set';
import get                 from 'lodash/get';
import isEmpty             from 'lodash/isEmpty';
import * as dotProp        from 'dot-prop-immutable';
import { findType }        from '../../utils/matrix'
import InitialState        from './initialState'

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
  const isBlock = findType(type) === 'block';

  const template = isBlock ? { [type] : [body] } : { [type] : body };

  return dotProp.set(state, path, val => val.concat(template));
};

const changeType = (state, action) => {
  const {path, oldProp, newProp } = action.payload;
  return dotProp.set(state, path, value => {
    let propsBody = {}; //value[oldProp];
    switch(newProp) {
      case 'match':
        propsBody = { key: '', op: '=', value: '1' };
        break;

      case 'equal':
        propsBody = { key: '', op: '=', value: '1' };
        break;

      case 'notEqual':
        propsBody = { key: '', op: '!=', value: '1' };
        break;

      case 'true':
        propsBody = { key: '', value: '1' };
        break;

      case 'in':
      case 'notIn':
        propsBody = { key: '', value: [] };
        break;

      default:
        propsBody = value[oldProp];
    }

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
    (value) => property ?
      dotProp.set(value, property, item) :
      Object.assign({}, value, item)
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
      if (length <= 1) {
        return value;
      }
      else {
        return value.filter((item, i) => index !== i);
      }
    });
};

const setFullQuestion = (state, action) => {
  const { body, body: {
    areas, title, question, key, step, answer, rule, content_type, test_file,
    packageLevels, testing, levelup_result, evaluation_result, properties
  }} = action.payload;
  const { subtype, type } = answer ;
  const _type = subtype === 'range' || type === 'range' ? 'range' : type;
  const _body = {
      areaIds: configArea(areas),
      questionTitle: title,
      question,
      testing,
      content_type,
      levelup_result,
      evaluation_result,
      evaluation_result_data: evaluationResultData(state, body),
      sequence: step,
      questionKey: key,
      answerType: _type,
      rules: Array.isArray(rule) ? rule: rule.and ? rule.and : [rule],
      [_type === 'multiple' ? 'single' : _type]: parseAnswers(answer),
      diagnostic_assets: test_file ||  [],
      packageLevelsList: configPackageLevelList(packageLevels)
    };

  return Object.assign({}, state, _body);
};


const evaluationResultData = (state, body) => {
  const { type, evaluation_result, properties } = body;

  if ( type !== 'evaluation' || !properties.evaluation) return state.evaluation_result_data;

  const oldValue =  state.evaluation_result_data;
  return {...oldValue, [evaluation_result]: properties.evaluation.data};
};

const setFullQuestionForCondition = (state, action) => {
  const { body, body: { areas, title, key, rule, package_level_id, testing}} = action.payload;
  const _body = {
    areaIds: configArea(areas),
    questionTitle: title,
    questionKey: key,
    testing,
    rules: Array.isArray(rule) ? rule: rule.and ? rule.and : [rule],
  };

  const res = body.package ?
    {..._body,
      treatmentsLevels: body.package.package_level_id,
      treatmentsPackage:{
        label: body.package.package_id,
        value: body.package.package_id
      }
    } : _body;
  return Object.assign({}, state, res);
};

const setFullBodyAreaEdit = (state, action) => {
  const {
    body,
    body: {
      title,
      key,
      description
    }
  } = action.payload;
  const _body = {
    title: title,
    key: key,
    description: description,
  };
  const res = body.package ?
    {
      ..._body,
      treatmentsLevels: { label: body.package.package_id, value:  body.package.package_id},
      treatmentsPackage:{ label: package_level_id, value: package_level_id}
    }
    :
    _body;
  return Object.assign({}, state, res);
};

const setFullQuestionForPackage = (state, action) => {
  const { body: {areas, title, key, packageLevels, type, testing_mode }} = action.payload;
  const _body = {
    areaIds: configArea(areas.data),
    questionTitle: title,
    questionKey: key,
    packageLevels: configPackageLevel(packageLevels.data),
    packageType: type,
    testing_mode
  };
  return Object.assign({}, state, _body);
};

const clearAll = () => InitialState;

const parseAnswers= (answer) => {
  if (answer.type === 'range') {
    const {max, min} = answer.values;
    return {
      from: min,
      to: max
    };
  }
  else if (answer.subtype === 'range') {
    const { values: {max, min} } = answer;
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

const configArea = (areas) => {
  return areas.map(el => el && el.id);
//  if (id) return { value: area.id, label: area.title, key: area.key };
//
//  return { value: null, label: 'All', key: null };
};

const configPackageLevelList = (data) => {
 return data && data.length ?
    data.map(({package_id, id}) => ({
      packageId :package_id,
      levelId   :id,
      levelsList:[]
    })) :
    [];
};

const configPackageLevel = (data) => {
  return data.reduce((result, el) => {
    if (el) {
      const { therapy_continuity, package_id, exercises, id, level, level_up_properties } = el;
      const properties = Array.isArray(level_up_properties) ?
        { vas: 1, vas_min: 1, sessions: 1 }: level_up_properties;
      return result.concat({
        therapy_continuity,
        package_id,
        exercises,
        id,
        level,
        level_up_properties: properties
      })
    }
    return result;
  }, []);
};

const deletePackageLevel = (state, action) => {
  const { id, index } = action.payload;
  return dotProp.set(
    state,
    'packageLevels',
    list => list.filter((item, i) =>  id ? item.id !== id : index !== i));
};

export default createReducer(Object.assign({}, InitialState), CREATE_QUESTION, {
  [`${CREATE_QUESTION}_UPDATE`]               : createQuestionUpdate,
  [`${CREATE_QUESTION}_ADD_RULE`]             : createQuestionRules,
  [`${CREATE_QUESTION}_CHANGE_TYPE`]          : changeType,
  [`${CREATE_QUESTION}_ADD_DEF_GROUP_RULE`]   : addDefaultGroupRule,
  [`${CREATE_QUESTION}_CHANGE_TO_ITEM_RULE`]  : changeToItemRule,
  [`${CREATE_QUESTION}_DELETE_ITEM`]          : deleteRule,
  [`${CREATE_QUESTION}_SET_QUESTION`]         : setQuestion,
  [`${CREATE_QUESTION}_ADD_NEW_ANSWER`]       : addNewAnswer,
  [`${CREATE_QUESTION}_REMOVE_ANSWER`]        : removeAnswer,
  [`${CREATE_QUESTION}_SET_FULL_QUESTION`]    : setFullQuestion,
  [`${CREATE_QUESTION}_SET_COND_QUESTION`]    : setFullQuestionForCondition,
  [`${CREATE_QUESTION}_SET_PACKAGE_QUESTION`] : setFullQuestionForPackage,
  [`${CREATE_QUESTION}_CLEAR_STATE`]          : clearAll,
  [`${CREATE_QUESTION}_DELETE_PACKAGE_LEVEL`] : deletePackageLevel,
  [`${CREATE_QUESTION}_SET_BODY_AREA`]        : setFullBodyAreaEdit,
});

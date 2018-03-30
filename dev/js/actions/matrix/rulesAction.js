import { store }           from '../../index'
import {
  CREATE_QUESTION,
  TABLE
}                          from '../types';


export const addRules = ({type, path, body}) =>
  store.dispatch(
    {
      type:`${CREATE_QUESTION}_ADD_RULE`,
      payload:{ type, path, body }
    }
  );


export const changeTypeOfRule  = (path, oldProp, newProp) =>
  store.dispatch(
    {
      type:`${CREATE_QUESTION}_CHANGE_TYPE`,
      payload:{ oldProp, newProp, path }
    }
  );

export const addDefaultGroupRule = (type, path, body) =>
  store.dispatch(
    {
      type:`${CREATE_QUESTION}_ADD_DEF_GROUP_RULE`,
      payload:{ type, path, body }
    }
  );

export const changeToItemRuleRule = ( path, body) =>
  store.dispatch(
    {
      type:`${CREATE_QUESTION}_CHANGE_TO_ITEM_RULE`,
      payload:{ path, body }
    }
  );

export const deleteRules = ( path, key) =>
  store.dispatch(
    {
      type:`${CREATE_QUESTION}_DELETE_ITEM`,
      payload:{ path, key }
    }
  );

export const setQuestion = (path, type, item, property) =>
  store.dispatch(
    {
      type:`${CREATE_QUESTION}_SET_QUESTION`,
      payload:{ path, type, item, property }
    }
  );

export const addNewAnswer = (type) =>
  store.dispatch(
    {
      type:`${CREATE_QUESTION}_ADD_NEW_ANSWER`,
      payload: { type }
    }
  );


export const removeAnswer = (type, index) =>
  store.dispatch(
    {
      type:`${CREATE_QUESTION}_REMOVE_ANSWER`,
      payload: { type, index }
    }
  );

export const deletePackageLevel = (id, index) =>
  store.dispatch(
    {
      type:`${CREATE_QUESTION}_DELETE_PACKAGE_LEVEL`,
      payload: { id, index }
    }
  );

export const changeParamsInTable = (path, value) =>
  store.dispatch(
    {
      type:`${TABLE}_CHANGE`,
      payload: { _path: path, value }
    }
  );




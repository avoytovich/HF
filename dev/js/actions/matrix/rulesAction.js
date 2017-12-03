import { store }           from '../../index'
import { CREATE_QUESTION } from '../types';


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
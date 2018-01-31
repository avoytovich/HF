import { T } from '../../index'
import { store } from '../../../index'

//here needs to be passed as argument to dispatch func instead of passing to mapDispatchToProps (no middleware needed)

export const dispatchBodyModel = payload => dispatch =>
  dispatch({
    type   : T.BODY_MODEL,
    payload: payload
  });

export const dispatchBodyModelWired = payload =>
  dispatchBodyModel(payload)(store.dispatch);


export const clearCreateQuestion = () =>
  store.dispatch({type:`${T.CREATE_QUESTION}_CLEAR`});

export const clearBodyAreaWired = () =>
  store.dispatch({type:`${T.BODY_MODEL}_CLEAR`});
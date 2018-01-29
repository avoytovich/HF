import { T } from '../index'
import { store } from '../../index'

export const dispatchBodyModel = payload => dispatch =>
  dispatch({
    type   : T.BODY_MODEL,
    payload: payload
  });

export const dispatchBodyModelWired = payload =>
  dispatchBodyModel(payload)(store.dispatch);

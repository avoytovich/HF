import { USER } from '../index'
import { store } from '../../index'

export const dispatchUserPayload = payload => dispatch =>
  dispatch({
    type   : USER,
    payload: payload
  });

export const dispatchUserPayloadWired = payload =>
  dispatchUserPayload(payload)(store.dispatch);

export const dispatchUserClearWired = () =>
  store.dispatch({ type: `${USER}_CLEAR` });

import { T } from '../index'
import { store } from '../../index'

export const dispatchAuthPayload = payload => dispatch =>
  dispatch({
    type   : T.AUTH,
    payload: payload
  });

export const dispatchAuthPayloadWired = payload =>
  dispatchAuthPayload(payload)(store.dispatch);

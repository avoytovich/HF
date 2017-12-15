import { PROFILE } from '../index'
import { store } from '../../index'

export const dispatchProfilePayload = payload => dispatch =>
  dispatch({
    type   : PROFILE,
    payload: payload
  });

export const dispatchProfilePayloadWired = payload =>
  dispatchProfilePayload(payload)(store.dispatch);

export const dispatchProfileClearWired = () =>
  store.dispatch({ type: `${PROFILE}_CLEAR` });

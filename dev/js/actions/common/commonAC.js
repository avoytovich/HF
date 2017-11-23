import { COMMON } from '../index'
import { store } from '../../index'

//here needs to be passed as argument to dispatch func instead of passing to mapDispatchToProps (no middleware needed)
export const dispatchCommonPayload = payload =>
  store.dispatch({
    type   : COMMON,
    payload: payload
  });

export const dispatchCommonPayloadWired = payload =>
  dispatchCommonPayload(payload)(store.dispatch);

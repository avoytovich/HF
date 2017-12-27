import { T } from '../index'
import { store } from '../../index'

//here needs to be passed as argument to dispatch func instead of passing to mapDispatchToProps (no middleware needed)
export const dispatchTestingPayload = payload => dispatch =>
  dispatch({
    type   : T.TESTING,
    payload: payload
  });

export const dispatchTestingPayloadWired = payload =>
  dispatchTestingPayload(payload)(store.dispatch);

export const dispatchBodyAreasIdsWired = payload =>
  store.dispatch({
    type: T.TESTING_BODY_AREAS_IDS,
    payload,
  });


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
    type: T.TESTING_BODY_AREAS,
    payload,
  });

export const dispatchAddQuestionsAndCondWired = payload =>
  store.dispatch({
    type: T.TESTING_ADD_QUESTIONS_AND_COND,
    payload,
  });

export const dispatchAddMultOptionWired = (path, answerId, id) =>
  store.dispatch({
    type: T.TESTING_ADD_MULT_OPTION,
    payload: { path, answerId, id },
  });

export const dispatchDeleteMultOptionWired = (path, answerId) =>
  store.dispatch({
    type: T.TESTING_DELETE_MULT_OPTION,
    payload: { path, answerId },
  });

export const dispatchRemoveOverStepQuestionsWired = payload =>
  store.dispatch({
    type: T.TESTING_REMOVE_OVERSTEP_QUESTIONS_AND_COND,
    payload,
  });


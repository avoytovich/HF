import { T } from '../index'
import { store } from '../../index'

export const dispatchTariffPlansPayload = payload => dispatch =>
  dispatch({
    type   : T.CREATE_TARIFF_PLAN,
    payload: payload
  });

export const dispatchTariffPlansPayloadWired = payload =>
  dispatchTariffPlansPayload (payload)(store.dispatch);

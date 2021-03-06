import { T } from '../index'
import { store } from '../../index'

export const dispatchTariffPlansPayload = payload => dispatch =>
  dispatch({
    type   : T.CREATE_TARIFF_PLAN,
    payload: payload
  });

export const dispatchTariffPlansPayloadWired = payload =>
  dispatchTariffPlansPayload (payload)(store.dispatch);

export const dispatchSimpleTariffPlansPayload = payload => dispatch =>
  dispatch({
    type   : T.SIMPLE_TARIFF_PLAN,
    payload: payload
  });

export const dispatchSimpleTariffPlansPayloadWired = payload =>
  dispatchSimpleTariffPlansPayload (payload)(store.dispatch);


export const dispatchPricingGroupsPayload = payload => dispatch =>
  dispatch({
    type   : T.CREATE_PRICING_GROUPS,
    payload: payload
  });

export const dispatchPricingGroupsPayloadWired = payload =>
  dispatchPricingGroupsPayload (payload)(store.dispatch);


export const dispatchPricingGroupsListPayload = payload => dispatch =>
  dispatch({
    type   : T.CREATE_PRICING_GROUPS_LIST,
    payload: payload
  });

export const dispatchPricingGroupsListPayloadWired = payload =>
  dispatchPricingGroupsListPayload  (payload)(store.dispatch);


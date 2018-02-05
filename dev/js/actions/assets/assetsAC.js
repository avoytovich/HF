import { ASSETS, ASSETS_DELETE } from '../index'
import { store } from '../../index'

//here needs to be passed as argument to dispatch func instead of passing to mapDispatchToProps (no middleware needed)
export const dispatchAssetsPayload = payload => dispatch =>
  dispatch({
    type   : ASSETS,
    payload: payload
  });

export const dispatchAssetsPayloadWired = payload =>
  dispatchAssetsPayload(payload)(store.dispatch);

export const dispatchDeleteAssetPayload = i => dispatch =>
  dispatch({
    type   : ASSETS_DELETE,
    payload: i
  });

export const dispatchDeleteAssetPayloadWired = i =>
  dispatchDeleteAssetPayload(i)(store.dispatch);

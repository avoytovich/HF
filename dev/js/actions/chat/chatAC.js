import { T } from '../index'
import { store } from '../../index'

export const dispatchCreateDialog = payload => dispatch =>
  dispatch({
    type   : T.CHAT,
    payload: payload
  });

export const dispatchCreateDialogWired = payload =>
  dispatchCreateDialog(payload)(store.dispatch);

export const dispatchGetMessages = payload => dispatch =>
  dispatch({
    type   : T.MESSAGE_LIST,
    payload: payload
  });

export const dispatchGetMessagesWired = payload =>
  dispatchGetMessages(payload)(store.dispatch);


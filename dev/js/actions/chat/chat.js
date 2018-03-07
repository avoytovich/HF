import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import {
  dispatchCreateDialogWired,
  dispatchGetMessagesWired } from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const createDialog = (data) => Api.post(`${domen.users}${api.createDialog}`,data);

export const getMessages = (dialog_id, data) => Api.post(`${domen.users}${api.getMessages}${dialog_id}`,data);

export const createMessage = (data) => Api.post(`${domen.users}${api.createMessage}`, data);


export const createGroupMessage = (users, message) => Api.post(`${domen.users}${api.groupMessage}`, {users, message});


export const createDialogWired = () => createDialog()
  .then(response => {
    dispatchCreateDialogWired(response.data.data);
  });

export const getMessagesWired = (dialog_id, data) => getMessages(dialog_id, data)
  .then(response => {
    dispatchGetMessagesWired(response.data||[]);

  });





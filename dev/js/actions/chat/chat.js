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


export const createGroupMessage = (list, message) => {
  const apiList   = list.map(item => Api.post(`${domen.users}${api.createMessage}`,
    {dialog_id: item.dialog_id, message}));
  return Promise.all(apiList).then(res => res)
};

export const createDialogWired = () => createDialog()
  .then(response => {
    dispatchCreateDialogWired(response.data.data);
  });

export const getMessagesWired = (dialog_id, data) => getMessages(dialog_id, data)
  .then(response => {
    dispatchGetMessagesWired(response.data||[]);

  });





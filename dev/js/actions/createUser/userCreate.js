import { Api }        from '../../utils';
import { domen, api } from '../../config/apiRoutes';
import { TABLE,
  CREATE_QUESTION }   from '../index'
import { store }      from '../../index'
import qs             from 'query-string';
import { T, CSV_FILE} from '../index'
import {
  toFormData,
} from '../../utils';

export const userCreate = (domenKey, apiKey, body) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.post(`${domenPath}${apiPath}`, body);
};

export const userCreateByCSV = (domenKey, apiKey, body) => {
  const domenPath = domen[domenKey], apiPath   = api[apiKey];
  let url = body.customer_id? `${domenPath}${apiPath}${body.customer_id}`: `${domenPath}${apiPath}`;
  return Api.post(url,
    toFormData({ csv: body.files[0].file }),
    { onUploadProgress: (progress => dispatchCreateSimpleUserPayloadWired ({ progress })) },
    { 'Content-Type': 'multipart/form-data' });
};

export const userUpdate = (domenKey, apiKey, customer_id,  body) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey];
  return Api.put(`${domenPath}${apiPath}${customer_id}`, body);
};

export const dispatchCreateUserPayload = payload => dispatch =>
  dispatch({
    type   : T.CREATE_USERS,
    payload: payload
  });

export const dispatchCreateUserPayloadWired = payload =>
  dispatchCreateUserPayload(payload)(store.dispatch);


export const dispatchCreateSimpleUserPayload = payload => dispatch =>
  dispatch({
    type   : T.CREATE_SIMPLE_USERS,
    payload: payload
  });

export const dispatchCreateSimpleUserPayloadWired = payload =>
  dispatchCreateSimpleUserPayload(payload)(store.dispatch);


export const dispatchCSVFilePayload = payload => dispatch =>
  dispatch({
    type   : CSV_FILE,
    payload: payload
  });

export const dispatchCSVFilePayloadWired = payload =>
  dispatchCSVFilePayload(payload)(store.dispatch);


import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import { get } from 'lodash'
import { dispatchProfilePayloadWired } from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const getProfile = (id, url) => Api.get(`${domen.users}/${url}/${id}`);

export const getProfileWired = (id, url) => getProfile(id, url)
  .then(response => {
    dispatchProfilePayloadWired(get(response,'data.data', {}));
  });

export const getDiagnosticByTherapyWired = (url, userId) => Api.get(`${domen.exercises}/${api[url]}${userId}`)
  .then(response => {
    dispatchProfilePayloadWired(get(response,'data', {}));
  });

export const getDiagnosticByDiagnosticIdWired = (diagnosticId) => Api.post(`${domen.diagnostics}/diagnostics/session/${diagnosticId}/answers`)
  .then(response => {
    dispatchProfilePayloadWired(get(response,'data.data.result', {}));
  });

export const twoFactorSwitcher = (domenKey, data, action) =>  {
  const domenPath = domen[domenKey];
  return Api.post(`${domenPath}/auth/tfa/${action}`, data);
}

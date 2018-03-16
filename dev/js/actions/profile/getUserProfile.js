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

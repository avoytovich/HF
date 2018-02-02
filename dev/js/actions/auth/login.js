import get from 'lodash/get';

import { Api } from '../../utils';
import { dispatchUserPayloadWired } from '../../actions';
import {
  domen,
  api,
} from '../../config';
import sha1   from 'sha1';

export const login = (data) => Api.post(`${domen.users}${api.login}`, data);

export const loginWired = data => login({ ...data, ...{ password: sha1(data.password) } })
  .then(response => {
    const token = get(response, 'headers["app-token"]', false);
    if (token) {
      dispatchUserPayloadWired({ token });
    }
    return response;
  });

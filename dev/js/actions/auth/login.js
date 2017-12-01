import get from 'lodash/get';

import { Api } from '../../utils';
import { dispatchUserPayloadWired } from '../../actions';
import {
  domen,
  api,
} from '../../config';

export const login = data => Api.post(`${domen.users}${api.login}`, data);

export const loginWired = data => login(data)
  .then(response => {
    const token = get(response, 'headers["app-token"]', false);
    if (token) {
      dispatchUserPayloadWired({ token });
    }
    return response;
  });

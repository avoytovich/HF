import get from 'lodash/get';
import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import { dispatchUserPayloadWired } from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const login = data => Api.post(`${domen.users}${api.login}`, data);

export const loginWired = data => login(data)
  .then(response => {
    const token = get(response, 'headers["app-token"]', false);
    if (token) {
      dispatchUserPayloadWired({ token });
      browserHistory.push(PAGE.home)
    }
  });

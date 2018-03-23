import get from 'lodash/get';
import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import {
  dispatchUserPayloadWired,
  dispatchAuthPayloadWired,
} from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';
import sha1   from 'sha1';

export const login = (data) => Api.post(`${domen.users}${api.login}`, data);

export const loginWired = data => login({ ...data, ...{ password: sha1(data.password) } })
  .then(response => {

    const token        = get(response, 'headers["app-token"]', false);
    const refreshToken = get(response, 'headers["refresh-token"]', false);
    const user         = get(response, 'data.data', {});
    const status       = get(response, 'status', {});
    if (status === 202) {
      return dispatchAuthPayloadWired({ showTwoFactorModal: true });
    }
    if (token && refreshToken) {
      dispatchUserPayloadWired({ token, refreshToken, ...user });

      user.role === 'admin' ?
        browserHistory.push(PAGE.home) :
        browserHistory.push(PAGE.personalCabinetProfile);
    }
  });

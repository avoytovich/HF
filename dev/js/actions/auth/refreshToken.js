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

export const refreshToken = data => Api.post(`${domen.users}${api.refresh}`, data);

export const refreshTokenWired = data => refreshToken(data)
  .then(response => {

    const token = get(response, 'headers["app-token"]', false);

    if (token) {
      dispatchUserPayloadWired({ token });
      return true;
    }

  });

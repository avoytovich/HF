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

export const twoFactorConfirm = (data) => Api.post(`${domen.users}${api.twoFactorConfirm}`, data);

export const twoFactorConfirmWired = data => {
  return twoFactorConfirm(data)
    .then(response => {

      const token = get(response, 'headers["app-token"]', false);
      const user  = get(response, 'data.data', {});

      dispatchAuthPayloadWired({ showTwoFactorModal: false });
      if (token) {
        dispatchUserPayloadWired({ token, ...user });
      }
      user.role === 'admin' ?
        browserHistory.push(PAGE.home):
        browserHistory.push(PAGE.personalCabinetProfile);
    });
}

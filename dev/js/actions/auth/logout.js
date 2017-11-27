import get from 'lodash/get';
import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import { page } from '../../config';
import { dispatchUserClearWired } from '../../actions';
import { domen, api } from '../../config/apiRoutes';

export const logout = () => Api.post(`${domen.users}${api.logout}`);

export const logoutWired = () => logout()
  .then(response => {
    dispatchUserClearWired();
    browserHistory.push(page.login);
  })
  .catch(err => {
    dispatchUserClearWired();
    browserHistory.push(page.login);
  });

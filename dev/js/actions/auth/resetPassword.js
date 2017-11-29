import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import { PAGE } from '../../config';
import { notifier } from '../../actions';
import { domen, api } from '../../config/apiRoutes';

export const resetPassword = ({ token, user_id, password }) => Api.post(
  `${domen.users}${api.passReset}`,
  { user_id, password},
  undefined,
  {'Pass-Token': token}
);

export const resetPasswordWired = data => resetPassword(data)
  .then(response => {
    notifier({
      title: 'Success',
      message: 'Password has been updated',
      status: 'success',
    })
    browserHistory.push(PAGE.login)
  })
  .catch(err => {
    notifier({
      title: 'Error occurred',
      message: err.message || 'Something went wrong.',
      status: 'error',
    })
  });

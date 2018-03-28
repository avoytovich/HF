import sha1 from 'sha1';
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

export const resetPasswordWired = data => resetPassword({ ...data, ...{ password: sha1(data.password) } })
  .then(response => {
    notifier({
      title: 'Success',
      message: 'Password has been updated',
      status: 'success',
    });
    browserHistory.push(PAGE.login)
  })
  .catch(err => {
    notifier({
      title: 'Error occurred',
      message: err.message || 'Something went wrong.',
      status: 'error',
    })
  });


export const getPassToken = (code, user_id) =>
  Api.post(
    `${domen.users}${api.userConfirm}`,
    { user_id, code}
  )
  .then(response => response)
  .catch(err => {
    notifier({
      title: 'Error occurred',
      message: err.message || 'Something went wrong.',
      status: 'error',
    })
  });
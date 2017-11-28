import get from 'lodash/get';
import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import { page } from '../../config';
import {
  dispatchUserClearWired,
  notifier,
} from '../../actions';
import { domen, api } from '../../config/apiRoutes';

export const sendEmailForgetPass = data => Api.post(`${domen.users}${api.passForgot}`, data);

export const sendEmailForgetPassWired = data => sendEmailForgetPass(data)
  .then(response => {
    notifier({
      title: 'Success',
      message: 'Link has been sent to your email.',
      status: 'success',
    })
  })
  .catch(err => {
    notifier({
      title: 'Error occurred',
      message: err.message || 'Something went wrong.',
      status: 'error',
    })
  });

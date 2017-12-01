import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import { dispatchUserPayloadWired } from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const getUser = () => Api.get(`${domen.users}${api.userOwn}`);

export const getUserWired = () => getUser()
  .then(response => {
    dispatchUserPayloadWired(response.data.data);
    browserHistory.push(PAGE.home)
  });

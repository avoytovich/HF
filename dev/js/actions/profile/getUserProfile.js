import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import { get } from 'lodash'
import { dispatchProfilePayloadWired } from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const getProfile = (id) => Api.get(`${domen.users}/customers/${id}`);

export const getProfileWired = (id) => getProfile(id)
  .then(response => {
    dispatchProfilePayloadWired(get(response,'data.data', {}));
  });

export const getUsersForCustomer = (id,body) => Api.post(`${domen.users}/users/customer/${id}`,body);

export const getUsersForCustomerWired = (id,body) => getUsersForCustomer(id,body)
  .then(response => {
   console.log('done')
  });


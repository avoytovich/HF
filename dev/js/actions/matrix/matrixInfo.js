import get from 'lodash/get';
import { Api } from '../../utils';
import { dispatchUserPayloadWired } from '../../actions';
import { domen, api } from '../../config/apiRoutes';
import qs                   from 'query-string';

import axios from 'axios';

const getInfo = (domenPath, apiPath, query) => {
  return query ?
    Api.get(`${domenPath}${apiPath}?${query}`) :
    Api.get(`${domenPath}${apiPath}`);
};

export const getMmatrixInfo = (domenKey, apiKey, query) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        querySt   = qs.stringify(query);
  return getInfo(domenPath, apiPath, querySt).then(
    res => {
      console.log(res)
    })
};
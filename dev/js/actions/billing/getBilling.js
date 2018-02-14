import { browserHistory } from 'react-router';
import { Api } from '../../utils';
import { get } from 'lodash'
import { dispatchTariffPlansPayloadWired } from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const getTariffPlans = (url) => Api.get(`${domen.users}/${api.url}`);

export const getTariffPlansWired = (url) => getTariffPlans(url)
  .then(response => {
    dispatchTariffPlansPayloadWired(get(response,'data.data', {}));
  });

export const tariffPlanCreate = (domenKey, apiKey, body) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey];
  return Api.post(`${domenPath}${apiPath}`, body);
};

export const tariffPlanUpdate = (domenKey, apiKey, body, id) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey];
  return Api.put(`${domenPath}${apiPath}/${id}`, body);
};




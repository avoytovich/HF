import get            from 'lodash/get';
import { Api }        from '../../utils';
import { domen, api } from '../../config/apiRoutes';
import { LIST }       from '../index'
import { store }      from '../../index'
import qs             from 'query-string';

const getInfo = (domenPath, apiPath, query) => {
  return query ?
    Api.get(`${domenPath}${apiPath}?${query}`) :
    Api.get(`${domenPath}${apiPath}`);
};

export const getMmatrixInfo = (domenKey, apiKey, query) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        querySt   = qs.stringify(query);
  return getInfo(domenPath, apiPath, querySt).then(dispatchTableInfo)
};

export const dispatchTableInfo = ({data}) =>
  store.dispatch({ type: `${LIST}_UPDATE` , payload: data});
import get            from 'lodash/get';
import { Api }        from '../../utils';
import { domen, api } from '../../config/apiRoutes';
import { TABLE }      from '../index'
import { store }      from '../../index'
import qs             from 'query-string';

const getInfo = (domenPath, apiPath, query) => {
  return query ?
    Api.get(`${domenPath}${apiPath}?${query}`) :
    Api.get(`${domenPath}${apiPath}`);
};

export const getMatrixInfo = (domenKey, apiKey, query, path) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        querySt   = qs.stringify(query);
  return getInfo(domenPath, apiPath, querySt)
          .then((res) => dispatchTableInfo(res, path))
};

export const dispatchTableInfo = ({data}, path) => {
 return store.dispatch({type:`${TABLE}_UPDATE`,
    payload:{
      ...data,
      path
    }
  });
};
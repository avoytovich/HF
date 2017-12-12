import get            from 'lodash/get';
import { Api }        from '../../utils';
import { domen, api } from '../../config/apiRoutes';
import { TABLE,
  CREATE_QUESTION }   from '../index'
import { store }      from '../../index'
import qs             from 'query-string';

const getInfo = (domenPath, apiPath, query) => {
  return query ?
    Api.get(`${domenPath}${apiPath}?${query}`) :
    Api.get(`${domenPath}${apiPath}`);
};

export const getMatrixInfo = ( domenKey, apiKey, query, path) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        querySt   = qs.stringify(query);
  return getInfo(domenPath, apiPath, querySt)
          .then((res) => {
    dispatchTableInfo(res, path);
    updateTableFields(query, `${path}.sortOptional`);
  })
};

export const updateTableFields = (query, path) => {
  return store.dispatch({type:`${TABLE}_UPDATE_FIELDS`,
    payload:{
      ...query,
      path
    }
  });
};

export const dispatchTableInfo = ({data}, path) => {
 return store.dispatch({type:`${TABLE}_UPDATE`,
    payload:{
      ...data,
      path
    }
  });
};

export const getInfoByPost = (domenKey, apiKey, body, _query) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];

  const pagination =  {
      total        : 0,
      count        : 0,
      per_page     : 5,
      current_page : 0,
      total_pages  : 0,
      order        : 'asc',
      orderBy      : 'users', // Custom
  };

  Api.post(`${domenPath}${apiPath}`, body).then(res => {
    const {data} = res.data.data.users;
    return store.dispatch({type:`${TABLE}_UPDATE`,
      payload:{
        data,
        meta: {pagination},
        path: 'userAll'
      }
    })
  });
};

export const clearCreateQuestion = () =>
  store.dispatch({type:`${CREATE_QUESTION}_CLEAR`});

export const updateCrateQuestionFields = (data, path) => {
  return store.dispatch({type:`${CREATE_QUESTION}_UPDATE`,
    payload:{
      data,
      path
    }
  });
};

export const deactivateItem = (domenKey, apiKey, ids) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        apiList   = ids.map(item => Api.put(`${domenPath}${apiPath}/${item.id}`, {enabled: false}));

  return Promise.all(apiList).then(res => res)
};

export const deleteItem = (domenKey, apiKey, ids) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey],
    apiList   = ids.map(item => Api.delete(`${domenPath}${apiPath}/${item.id}`));

  return Promise.all(apiList).then(res => res)
};


export const diagnosisQuestionCreate = (domenKey, apiKey, body) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.post(`${domenPath}${apiPath}`, body);
};

export const getQuestionById = (domenKey, apiKey, id) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}/${id}`).then(res => {
      if (res) {
        const { data } = res.data;
        const body = {...data};
        store.dispatch(
          {
            type:`${CREATE_QUESTION}_SET_FULL_QUESTION`,
            payload: { body }
          }
        );
        return data;
      };
    }
  );
};

export const findArea = (domenKey, apiKey) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}`);
};

export const findPackage = (domenKey, apiKey, input, area) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  const body = { body_area: area, title: input };

  return Api.post(`${domenPath}${apiPath}`, body, {showErrNotif: false});
}

export const findUniqueKey = (domenKey, apiKey, key) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.post(`${domenPath}${apiPath}`, {key}, {showErrNotif: false});
};

export const findByArea = (domenKey, apiKey, body, string) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.post(`${domenPath}${apiPath}?search=${string}`, body);
};


export const getSequenceList = (domenKey, apiKey) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        body = {
          "type": "diagnostic",
          "text": "",
          "area": null,
          "step": null
        };
  return Api.post(`${domenPath}${apiPath}`, body);
};


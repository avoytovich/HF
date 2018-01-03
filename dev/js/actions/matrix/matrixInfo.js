import get            from 'lodash/get';
import { Api }        from '../../utils';
import { domen, api } from '../../config/apiRoutes';
import { TABLE,
  CREATE_QUESTION }   from '../index'
import { store }      from '../../index'
import qs             from 'query-string';

export const getMatrixInfo = (domenKey, apiKey, query, path, url) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        querySt   = qs.stringify(query);
  const finalUrl  = url ? url : `${domenPath}${apiPath}${querySt ? '?' + querySt : ''}`;
  return Api.get(finalUrl)
          .then((res) => dispatchTableInfo(res, path, query));
};

export const dispatchTableInfo = ({data}, path, query) => {
 return store.dispatch({type:`${TABLE}_UPDATE`,
    payload:{
      ...data,
      path,
      query
    }
  });
};

export const getListByPost = (domenKey, apiKey, _query, url) => {
  _query.orderBy === 'title' && delete _query.orderBy;
  const finalQuery = { ..._query, page: +_query.current_page + 1, limit: _query.per_page };
  const finalUrl   = url ? url : `${domen[domenKey]}${api[apiKey]}`;
  return Api.post(finalUrl, finalQuery)
    .then(res => {
      const { data, meta } = res.data;
      return store.dispatch({
        type: `${TABLE}_UPDATE`,
        payload: {
          data,
          meta,
          path: apiKey,
          query: _query
        }
      })
    });
};

export const clearCreateQuestion = () =>
  store.dispatch({type:`${CREATE_QUESTION}_CLEAR_STATE`});

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

export const activateCustomer = (domenKey, apiKey, ids) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey],
    apiList   = ids.map(item => Api.post(`${domenPath}${apiPath}/${item.id}/activate`, {customer_id: item.id}));
  return Promise.all(apiList).then(res => res)
};

export const activateUser = (domenKey, apiKey, ids) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey],
    apiList   = ids.map(item => Api.post(`${domenPath}${apiPath}${item.user_id}/activate`, {user_id: item.id}));
  return Promise.all(apiList).then(res => res)
};

export const deleteItem = (domenKey, apiKey, ids) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey],
    apiList   = ids.map(item => Api.delete(`${domenPath}${apiPath}/${item.id}`));

  return Promise.all(apiList).then(res => res)
};


export const diagnosisQuestionCreate = (domenKey, apiKey, body, id) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return id ? Api.post(`${domenPath}${apiPath}/${id}`, body):
              Api.post(`${domenPath}${apiPath}`, body);
};

export const updateQuestionCreate = (domenKey, apiKey, body, id) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return id ?
    Api.put(`${domenPath}${apiPath}/${id}`, body) :
    Api.put(`${domenPath}${apiPath}`, body);
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
      }
    }
  );
};
export const getConditionById = (domenKey, apiKey, id) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}/${id}`).then(res => {
      if (res) {
        const { data } = res.data;
        const body = {...data};
        store.dispatch(
          {
            type:`${CREATE_QUESTION}_SET_COND_QUESTION`,
            payload: { body }
          }
        );
        return data;
      }
    }
  );
};

export const getPackagenById = (domenKey, apiKey, id, do_not_set) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}/${id}`).then(res => {
      if (res) {
        const { data } = res.data;
        !do_not_set && store.dispatch(
          {
            type:`${CREATE_QUESTION}_SET_PACKAGE_QUESTION`,
            payload: { body: {...data }}
          }
        );
        return data.packageLevels;
      }

    }
  );
};

export const getTreatmentById = (domenKey, apiKey, id) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}/${id}`).then(res => {
    if (res) {
      const { data } = res.data;
      const body = {...data};
      store.dispatch(
        {
          type:`${CREATE_QUESTION}_SET_COND_QUESTION`,
          payload: { body }
        }
      );
      return data;
    }
  });
};

export const findArea = (domenKey, apiKey) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}`);
};

export const findPackage = (domenKey, apiKey, input, area) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  const body = { area_id: area || null, title: input };

  return Api.post(`${domenPath}${apiPath}`, body, {showErrNotif: false});
};

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

export const findConditionsByArea = (domenKey, apiKey, body, string) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.post(`${domenPath}${apiPath}`, body);
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

export const getQuestionsByStep = (domenKey, apiKey, body) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];

  return Api.post(`${domenPath}${apiPath}`, body).then(({data}) => data.data);
};


export const getPackageLevel = (domenKey, apiKey, list, level) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];

  return Api.post(`${domenPath}${apiPath}`, {ids: list}).then(({data}) => data);
//    store.dispatch({type:`${CREATE_QUESTION}_UPDATE`,
//      payload:{
//        data: data.data,
//        path: `packageLevels[${level}].exercise_ids`,
//      }
//    })
//  );
};

export const getExercises = (domenKey, apiKey, text) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];

  const url = text ?
    `${domenPath}${apiPath}?search=${text}` :
    `${domenPath}${apiPath}`;
  return Api.get(url).then(({data}) => data.data);
};


export const getExerciseById =  (domenKey, apiKey, id) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  Api.get(`${domenPath}${apiPath}/${id}`).then(res => {
      if (res) {
        const { data } = res.data;
        store.dispatch(
          {
            type:`${CREATE_QUESTION}_UPDATE`,
            payload: {data, path: 'exercise'}
          }
        );
        return data;
      }
    }
  );
};


import get            from 'lodash/get';
import { Api }        from '../../utils';
import { domen, api } from '../../config/apiRoutes';
import { TABLE,
  CREATE_QUESTION }   from '../index'
import { store }      from '../../index'
import qs             from 'query-string';

const getList = (domenPath, apiPath, query) => {
  return query ?
    Api.get(`${domenPath}${apiPath}?${query}`) :
    Api.get(`${domenPath}${apiPath}`);
};

export const getMatrixInfo = ( domenKey, apiKey, query, path) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        querySt   = qs.stringify(query);
  return getList(domenPath, apiPath, querySt)
          .then((res) => dispatchTableInfo(res, path));
//  return getInfo(domenPath, apiPath, querySt)
//          .then((res) => {
//    dispatchTableInfo(res, path);
//    updateTableFields(query, `${path}.sortOptional`);
//  })
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

export const getListByPost = (domenKey, apiKey, _query) => {
  return Api.post(`${domen[domenKey]}${api[apiKey]}`, _query)
    .then(res => {
      const { data, meta } = res.data;
      return store.dispatch({
        type: `${TABLE}_UPDATE`,
        payload: {
          data,
          meta,
          path: 'userAll'
        }
      })
    });
}

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

export const updateQuestionCreate = (domenKey, apiKey, body, id) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.put(`${domenPath}${apiPath}/${id}`, body);
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

export const getPackagenById = (domenKey, apiKey, id) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}/${id}`).then(res => {
      if (res) {
        const { data } = res.data;
        store.dispatch(
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
  const body = { body_area: area, title: input };

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


export const getPackageLevel = (domenKey, apiKey, list) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];

  return Api.post(`${domenPath}${apiPath}`, {ids: list}).then(({data}) =>
    store.dispatch({type:`${CREATE_QUESTION}_UPDATE`,
      payload:{
        data: data.data,
        path: 'exercise_ids',
      }
    })
  );
};


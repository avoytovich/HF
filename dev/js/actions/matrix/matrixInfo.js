import get            from 'lodash/get';
import isEmpty        from 'lodash/isEmpty';
import { Api }        from '../../utils';
import { T }          from '../../actions';
import { domen, api } from '../../config/apiRoutes';
import { TABLE,
  CREATE_QUESTION }   from '../index'
import { store }      from '../../index'
import qs             from 'query-string';

export const dispatchMatrixPayload = payload => dispatch =>
  dispatch({
    type   : T.CREATE_QUESTION,
    payload: payload
  });

export const dispatchMatrixPayloadWired = payload =>
  dispatchMatrixPayload(payload)(store.dispatch);

export const getMatrixInfo = (domenKey, apiKey, query, path, url) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        queryFormStore = get(store.getState(), `tables.${path}.sortOptional`, {}),
        _query     = { ...query, queryFormStore },
        querySt   = qs.stringify(_query);
  const finalUrl  = url ? url : `${domenPath}${apiPath}${querySt ? '?' + querySt : ''}`;
  return Api.get(finalUrl)
          .then((res) => dispatchTableInfo(res, path, _query));
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
//  _query.orderBy === 'title' && delete _query.orderBy;
  const queryFormStore = get(store.getState(), `tables.${apiKey}.sortOptional`, {});
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

export const updateCrateQuestionFields = (data, path) => {
  return store.dispatch({type:`${CREATE_QUESTION}_UPDATE`,
    payload:{
      data,
      path
    }
  });
};

export const updatePickedExercisesInPackages = (data, path, level) => {
  const currentExercisesForPackages = get(store.getState(), `createDiagnosisQuestion.${path}`, []);

  // filter passed into function exercises from existing ones
  const filteredIncomingExercisesForPackages = data
    .filter(({ id: incomExId, order: incomExOrder }) => {

      // checks if iterating exercise exists in exercises' array
      return isEmpty(
        currentExercisesForPackages.find(({ order, id }) => {
          return id === incomExId && order === incomExOrder
        })
      );
    });
  const finalExercise = currentExercisesForPackages.concat(filteredIncomingExercisesForPackages);
  return updateCrateQuestionFields(finalExercise, path)
};

export const deactivateItem = (domenKey, apiKey, ids, activate) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        apiList   = ids.map(item => Api.put(`${domenPath}${apiPath}/${item.id}`, {enabled: !!activate}));
  return Promise.all(apiList).then(res => res)
};
export const activateCustomer = (domenKey, apiKey, ids) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey],
    apiList   = ids.map(item => Api.post(`${domenPath}${apiPath}${item.id}/activate`));
  return Promise.all(apiList).then(res => res)
};

export const activateUser = (domenKey, apiKey, ids, value) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey],
    apiList   = ids.map(item => Api.post(`${domenPath}${apiPath}${item.user_id||item.id ||item.key}/${value}`));
  return Promise.all(apiList).then(res => res)
};

export const deleteUser = (domenKey, apiKey, ids) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey],
    apiList   = ids.map(item => Api.delete(`${domenPath}${apiPath}${item.user_id ||item.id ||item.key }`));
  return Promise.all(apiList).then(res => res)
};

export const deleteItem = (domenKey, apiKey, ids) => {
  const domenPath = domen[domenKey],
    apiPath   = api[apiKey],
    apiList   = ids.map(item => Api.delete(`${domenPath}${apiPath}/${item.id}`));

  return Promise.all(apiList).then(res => res)
};

export const updateQuestionCreate = (domenKey, apiKey, body, id) => {
  console.log('body', body);
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

export const getPackagenById = (domenKey, apiKey, id, tab, levelInfo, newPackageLevels, do_not_set) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}/${id}`).then(res => {
      if (res) {
        const { data } = res.data;
        !do_not_set && store.dispatch(
          {
            type:`${CREATE_QUESTION}_SET_PACKAGE_QUESTION`,
            payload: { body: {...data, tab, levelInfo, newPackageLevels }}
          }
        );
        return data;//.packageLevels;
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
  return Api.post(`${domenPath}${apiPath}`);
};

export const findPackage = (domenKey, apiKey, input, area) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  const body = { areaIds: area || [], title: input };

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


export const getSequenceList = (domenKey, apiKey, type) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey],
        body = {
          "type": type,
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

export const getExercises = (domenKey, apiKey, text, next_page, per_page) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];

  let url = next_page ?
    `${domenPath}${apiPath}?current_page=${next_page}&page=${next_page}` :
    `${domenPath}${apiPath}?current_page=1`;
  url = per_page ?
    `${url}&per_page=${per_page}` :
    `${url}`;
  url = text ?
    `${url}&search=${text}` :
    `${url}`;
  return Api.get(url).then(({data}) => data.data);
};


export const getExerciseById =  (domenKey, apiKey, id) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}/${id}`)
    .then(res => {
      if (res) {
        const { data } = res.data;
        console.log('data', data);
        store.dispatch(
          {
            type:`${CREATE_QUESTION}_UPDATE`,
            payload: {data, path: 'exercise'}
          }
        );
        return data;
      }
    });
};


export const changeSequenceTitle = (domenKey, apiKey, step, value) => {
  const domenPath = domen[domenKey],
        apiPath   = api[apiKey];
  return Api.put(`${domenPath}${apiPath}/${step}`, value);
};


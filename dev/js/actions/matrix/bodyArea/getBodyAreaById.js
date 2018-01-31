import get from 'lodash/get';

import {
  domen,
  api
} from '../../../config'
import { Api} from '../../../utils'
import { store } from '../../../index';
import {
  T,
  dispatchBodyModelWired,
} from '../../../actions';

export const getBodyAreaById = (domenKey, apiKey, id) => {
  const domenPath = domen[domenKey];
  const apiPath   = api[apiKey];
  return Api.get(`${domenPath}${apiPath}/${id}`).then(res => {
    if (res) {
      const {
        data: body,
        data: {
          side = 'front'
        }
      }                 = res.data;
      store.dispatch({
        type:`${T.CREATE_QUESTION}_SET_BODY_AREA`,
        payload: { body }
      });
      const coordinates = get(body, 'properties.coordinates', false);
      if (coordinates) {
        dispatchBodyModelWired({ [`currentlyDrawingPolygon.${side}`]: coordinates });
      }
      return body;
    }
  });
};
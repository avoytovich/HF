import { browserHistory } from 'react-router';
import get from 'lodash/get';

import {
  Api,
  validAssets,
} from '../../utils';
import {
  dispatchAddQuestionsAndCondWired,
} from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const createTest = (data) => Api.post(`${domen.diagnostics}${api.diagnostics}`, data);

export const createTestWired = (data) => createTest(data)
  .then(resp => {
    const {
      result : {
        questions = [],
        conditions = {},
        condition = {},
        treatments = [],
      },
      step,
      id,
      result_status,
    } = get(resp, 'data.data', {});
    dispatchAddQuestionsAndCondWired({
      questions,
      conditions,
      step,
      id,
      result_status,
      condition,
      treatments,
    })
  })
  .catch(err => {
    console.log(err);
  });


export const getConditions = body =>
  Api.get(`${domen.diagnostics}${api.conditions}`, body)
    .then(res =>
      get(res, 'data.data', [])
      .map(item => ({ ...item, value: item.id, label: item.title }))
    );

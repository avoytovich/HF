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
    const questions     = get(resp, 'data.data.result.questions', []);
    const conditions    = get(resp, 'data.data.result.conditions', {});
    const step          = get(resp, 'data.data.step');
    const id            = get(resp, 'data.data.id');
    const result_status = get(resp, 'data.data.result_status');
    dispatchAddQuestionsAndCondWired({ questions, conditions, step, id, result_status })
  })
  .catch(err => {
    console.log(err);
  });

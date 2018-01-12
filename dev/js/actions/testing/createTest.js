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
      },
      step,
      id,
      result_status,
    } = get(resp, 'data.data', {});
    dispatchAddQuestionsAndCondWired({ questions, conditions, step, id, result_status, condition })
  })
  .catch(err => {
    console.log(err);
  });

import { browserHistory } from 'react-router';
import get from 'lodash/get';

import {
  Api,
  validAssets,
} from '../../utils';
import {
  dispatchAddQuestionsWired,
} from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const createTest = (data) => Api.post(`${domen.diagnostics}${api.diagnostics}`, data);

export const createTestWired = (data) => createTest(data)
  .then(resp => {
    const questions = get(resp, 'data.data.result.questions', []);
    dispatchAddQuestionsWired(questions)
  })
  .catch(err => {
    console.log(err);
  });

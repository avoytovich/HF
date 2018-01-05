import { browserHistory } from 'react-router';
import get from 'lodash/get';

import {
  Api,
} from '../../utils';
import { dispatchAddQuestionsAndCondWired } from '../../actions';
import {
  domen,
  api,
} from '../../config';

export const checkQuestion = (testId, data) =>
  Api.post(`${domen.diagnostics}${api.checkQuestion}/${testId}/check/step`, data);

export const checkQuestionWired = (testId, data) => checkQuestion(testId, data)
  .then(resp => {
    const questions     = get(resp, 'data.data.result.questions', []);
    const conditions    = get(resp, 'data.data.result.conditions', {});
    const condition    = get(resp, 'data.data.result.condition', null);
    const step          = get(resp, 'data.data.step');
    const id            = get(resp, 'data.data.id');
    const result_status = get(resp, 'data.data.result_status');
    dispatchAddQuestionsAndCondWired({ questions, conditions, step, id, result_status, condition });
  })
  .catch(err => console.log(err));

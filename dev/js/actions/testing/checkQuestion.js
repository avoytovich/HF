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
    });
  })
  .catch(err => console.log(err));

import { browserHistory } from 'react-router';
import get from 'lodash/get';
import set from 'lodash/set';
import each from 'lodash/each';

import {
  Api,
} from '../../utils';
import {
  dispatchAddQuestionsAndCondWired,
  dispatchTestingPayloadWired,
} from '../../actions';
import {
  domen,
  api,
} from '../../config';

export const getExistingTest = (testId) =>
  Api.post(`${domen.diagnostics}${api.existingTest}/${testId}/answers`);

export const getExistingTestWired = (testId) => getExistingTest(testId)
  .then(resp => {
    const {
      result : {
        answers = {},
        questions = [],
        conditions = {},
        condition = {},
      },
      step,
      id,
      result_status,
      title,
    } = get(resp, 'data.data', {});
    let getAnswers = (answers) => {
      let returnObj = {};
      for (let key in answers) {
        set(returnObj, `${key}.value`, answers[key]);
        questions.forEach(q => {
          if (q.key === key) {
            set(returnObj, `${key}.type`, q.answer.type);
          } else {
            set(returnObj, `${key}.type`, 'single');
          }
        });
      }
      return returnObj;
    };
    dispatchAddQuestionsAndCondWired({ questions, conditions, step, id, result_status, condition });
    dispatchTestingPayloadWired({ title, ...getAnswers(answers) })
  })
  .catch(err => console.log(err));

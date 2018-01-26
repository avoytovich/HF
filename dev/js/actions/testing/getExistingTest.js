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

const getAnswers = (answers, questions) => {
  let returnObj = {};
  for (let key in answers) {
    set(returnObj, `${key}.value`, answers[key]);
    set(returnObj, `${key}.type`, 'single');

    questions.forEach((q, index) => {
      if (q.key === key) {
        set(returnObj, `${key}.type`, q.answer.type);
      }
      if (q.key.includes('vas_pain_level')) {
        set(returnObj, 'vas_pain_level', answers[q.key]);
        questions.splice(index, 1)
      }
      if (q.key.includes('vas_pain_type')) {
        set(returnObj, 'vas_pain_type', answers[q.key]);
        questions.splice(index, 1)
      }
    });

    if (key === 'vas_areas') {
      set(returnObj, 'bodyAreasPicked', answers[key]);
    }
  }
  return returnObj;
};

export const getExistingTest = (testId) =>
  Api.post(`${domen.diagnostics}${api.existingTest}/${testId}/answers`);

export const getExistingTestWired = (testId) => getExistingTest(testId)
  .then(resp => {
    const {
      result: {
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

    dispatchTestingPayloadWired({ title, ...getAnswers(answers, questions) });
    dispatchAddQuestionsAndCondWired({ questions, conditions, step: step - 1, id, result_status, condition });
  })
  .catch(err => console.log(err));

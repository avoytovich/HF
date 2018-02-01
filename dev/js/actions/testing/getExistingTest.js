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
  for (let answerKey in answers) {
    set(returnObj, `${answerKey}.value`, answers[answerKey].value);
    set(returnObj, `${answerKey}.type`, 'single');

    questions.forEach((q, index) => {
      if (q.key === answerKey) {
        // set the question type for all answered questions that came from the back end
        // if question key matches answer key
        set(returnObj, `${answerKey}.type`, q.answer.type);
        // set qto questions array its original step/sequence by creation - not answering
        set(questions, `${index}.${q.key}.step`, answers[answerKey].step);
      }
      // special case for vas - pain zones (a.k.a. body areas) - level
      if (q.key.includes('vas_pain_level')) {
        set(returnObj, 'vas_pain_level', answers[q.key].value);
        // prevent to render pain level as separate question
        questions.splice(index, 1)
      }
      // special case for vas - pain zones (a.k.a. body areas) - type
      if (q.key.includes('vas_pain_type')) {
        set(returnObj, 'vas_pain_type', answers[q.key].value);
        // prevent to render pain type as separate question
        questions.splice(index, 1)
      }
    });

    // special case for vas - pain zones (a.k.a. body areas) - set picked zones
    if (answerKey === 'vas_pain_areas') {
      set(returnObj, 'bodyAreasPicked', answers[answerKey].value);
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
        treatments = [],
      },
      step,
      id,
      result_status,
      title,
    } = get(resp, 'data.data', {});

    dispatchTestingPayloadWired({ title, ...getAnswers(answers, questions) });
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

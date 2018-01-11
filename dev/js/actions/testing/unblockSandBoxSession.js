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

export const unblockSandBoxSession = (testId) =>
  Api.post(`${domen.diagnostics}${api.checkQuestion}/${testId}/unblock`);

export const unblockSandBoxSessionWired = (testId) => unblockSandBoxSession(testId)
  .then(resp => { console.log(resp);})
  .catch(err => console.log(err));

import { browserHistory } from 'react-router';
import get from 'lodash/get';

import {
  Api,
  validAssets,
} from '../../utils';
import { dispatchBodyAreasIdsWired } from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const createTest = (data) => Api.post(`${domen.diagnostics}${api.diagnostics}`, data);

export const createTestWired = (data) => createTest(data)
  .then(resp => console.log(resp))
  .catch(err => {
    console.log(err);
  });

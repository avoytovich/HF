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

export const getBodyAreas = () => Api.get(`${domen.diagnostics}${api.bodyArea}?page=1&per_page=200`);

export const getBodyAreasWired = () => getBodyAreas()
  .then(resp => dispatchBodyAreasIdsWired(get(resp, 'data.data', [])))
  .catch(err => {
    console.log(err);
  });

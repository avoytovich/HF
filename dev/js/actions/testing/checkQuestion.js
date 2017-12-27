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

export const getAssets = (data) => Api.post(`${domen.diagnostics}${api.diagnostics}`, data);

export const getAssetsWired = (data) => getAssets(data)
  .then(resp => dispatchBodyAreasIdsWired(get(resp, 'data.data', [])))
  .catch(err => {
    console.log(err);
  });

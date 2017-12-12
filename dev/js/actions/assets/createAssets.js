import get from 'lodash/get';
import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const createAssets = data => Api.post(`${domen.exercises}${api.assets}`, data);

export const createAssetsWired = data => createAssets(data)
  .then(response => {
    console.log(response);
    browserHistory.push(PAGE.assets);
  })
  .catch(err => {
    console.log(err);
  });

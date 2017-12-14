import get from 'lodash/get';
import set from 'lodash/set';
import each from 'lodash/each';
import keys from 'lodash/keys';
import { browserHistory } from 'react-router';

import {
  Api,
  validAssets,
} from '../../utils';
import { dispatchAssetsPayloadWired } from '../../actions';
import {
  domen,
  api,
  PAGE,
} from '../../config';

export const createAssets = data => Api.post(`${domen.exercises}${api.assets}`, data);

export const createAssetsWired = data => createAssets(data)
  .then(response => browserHistory.push(PAGE.assets))
  .catch(err => {
    let errors = {};
    let errorsReceived = get(err, 'response.data', {});
    each(errorsReceived, (errorVal, errorPath) => set(errors, errorPath, errorVal.toString()));
    dispatchAssetsPayloadWired({ errors });
  });

export const createAssetsPreValidate= data => {
  const { errors, isValid } = validAssets(data);
  if (isValid) {
    return createAssetsWired(data);
  }
  dispatchAssetsPayloadWired({ errors })
};

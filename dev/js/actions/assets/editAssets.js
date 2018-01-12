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

export const editAssets = (data, key) => Api.put(`${domen[key]}${api.assets}/${data.id}`, data);

export const editAssetsWired = (data,key) => editAssets(data,key)
  .catch(err => {
    let errors = {};
    let errorsReceived = get(err, 'response.data', {});
    each(errorsReceived, (errorVal, errorPath) => set(errors, errorPath, errorVal.toString()));
    dispatchAssetsPayloadWired({ errors });
  });

export const editAssetsPreValidate = (data, key) => {
  const { errors, isValid } = validAssets(data);
  if (isValid) {
    return editAssetsWired(data, key);
  }
  dispatchAssetsPayloadWired({ errors });
  return false;
};

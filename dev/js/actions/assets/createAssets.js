import get from 'lodash/get';
import set from 'lodash/set';
import each from 'lodash/each';
import { browserHistory } from 'react-router';

import {
  Api,
  validAssets,
  toFormData,
} from '../../utils';
import { dispatchAssetsPayloadWired } from '../../actions';
import {
  domen,
  api,
} from '../../config';

export const createAssets = (data, domenKey) =>
  Api.post(`${domen[domenKey]}${api.assets}`, toFormData(data), {}, { 'Content-Type': 'multipart/form-data' });

export const createAssetsWired = (data,domenKey) => createAssets(data,domenKey)
  .catch(err => {
    let errors = {};
    let errorsReceived = get(err, 'response.data', {});
    each(errorsReceived, (errorVal, errorPath) => set(errors, errorPath, errorVal.toString()));
    dispatchAssetsPayloadWired({ errors });
  });

export const createAssetsPreValidate = (data, domenKey) => {
  const { errors, isValid } = validAssets(data);
  if (isValid) {
    return createAssetsWired(data, domenKey);
  }
  dispatchAssetsPayloadWired({ errors });
  return Promise.resolve(false);
};

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

export const editAssets = (data, domenKey) =>
  Api.post(
    `${domen[domenKey]}${api.assets}/${data.id}`,
    toFormData(data),
    { onUploadProgress: (progress => dispatchAssetsPayloadWired({ progress }))  },
    { 'Content-Type': 'multipart/form-data' }
  );

export const editAssetsWired = (data,domenKey) => editAssets(data,domenKey)
  .catch(err => {
    let errors = {};
    let errorsReceived = get(err, 'response.data', {});
    each(errorsReceived, (errorVal, errorPath) => set(errors, errorPath, errorVal.toString()));
    dispatchAssetsPayloadWired({ errors });
  });

export const editAssetsPreValidate = (data, domenKey) => {
  const { errors, isValid } = validAssets({ files: [data] });
  if (isValid) {
    return editAssetsWired(data, domenKey);
  }
  dispatchAssetsPayloadWired({ errors });
  return Promise.resolve(false);
};

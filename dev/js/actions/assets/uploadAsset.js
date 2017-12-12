import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import {
  PAGE,
} from '../../config';

export const uploadAssets = (url, data, onUploadProgress) =>
  Api.put(url, data, onUploadProgress);

export const uploadAssetsWired = (url, data, onUploadProgress) => uploadAssets(url, data, onUploadProgress)
  .then(response => {
    console.log('uploadAssetsWired', response);
    // browserHistory.push(PAGE.assets)
  });

import { browserHistory } from 'react-router';

import { Api } from '../../utils';
import {
  PAGE,
} from '../../config';

export const uploadAssets = (url, data, onUploadProgress, contentType) =>
  Api.put(url, data, { onUploadProgress }, { 'Content-Type': contentType });

export const uploadAssetsWired = (url, data, onUploadProgress, contentType) => uploadAssets(url, data, onUploadProgress, contentType)
  .then(response => {
    console.log('uploadAssetsWired', response);
    // browserHistory.push(PAGE.assets)
  });

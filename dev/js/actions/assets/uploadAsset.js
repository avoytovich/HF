import { Api } from '../../utils';

export const uploadAssets = (url, data, onUploadProgress, contentType) =>
  Api.put(
    url,
    data,
    { onUploadProgress },
    { 'Content-Type': contentType }
  );

export const uploadAssetsWired = (url, data, onUploadProgress, contentType) =>
  uploadAssets(url, data, onUploadProgress, contentType)
    .then(response => console.log('uploadAssetsWired', response));

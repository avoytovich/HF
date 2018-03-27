import get from 'lodash/get';

import { Api } from '../../utils';
import {  } from '../../actions';
import {
  domen,
  api,
} from '../../config';

export const deleteAsset = id => Api.delete(`${domen.exercises}${api.assets}/${id}`);
export const deleteDiagnosticAsset = id => Api.delete(`${domen.diagnostics}${api.assets}/${id}`);

export const deleteAssetWired = id => deleteAsset(id)
  .then(response => {
    console.log('deleteAsset', response);

  });

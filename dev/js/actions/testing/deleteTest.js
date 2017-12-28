import get from 'lodash/get';

import { Api } from '../../utils';
import {  } from '../../actions';
import {
  domen,
  api,
} from '../../config';

export const deleteTest = id => Api.delete(`${domen.diagnostics}${api.diagnostics}/${id}`);

export const deleteTestWired = id => deleteTest(id)
  .then(response => {
    console.log('deleteTest', response);
  });

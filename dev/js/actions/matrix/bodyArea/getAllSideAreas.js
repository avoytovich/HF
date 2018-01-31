import get from 'lodash/get';

import {
  domen,
  api
} from '../../../config'
import { Api } from '../../../utils'
import { store } from '../../../index';
import {
  T,
  dispatchBodyModelWired,
} from '../../../actions';

export const getAllSideAreas = (side) => Api.post(`${domen.diagnostics}${api.getAllSideAreas}`, { side });

export const getAllSideAreasWired = side => getAllSideAreas(side)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err));
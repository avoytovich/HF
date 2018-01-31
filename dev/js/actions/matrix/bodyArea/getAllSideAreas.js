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

export const getAllSideAreasWired = (side, id = false) => getAllSideAreas(side)
  .then(res => {
    const {
      data = [],
    } = res.data;
    data.forEach((area, i) => {
      const coordinates = get(area, 'properties.coordinates', false);
      if (coordinates && area.id != id) {
        dispatchBodyModelWired({ [`existingPolygons[${i}].${side}`]: coordinates });
      }
    });

  })
  .catch(err => console.log(err));
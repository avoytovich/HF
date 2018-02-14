import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import {
  domen,
  api
} from '../../../config'
import {
  Api,
  reverseCoords
} from '../../../utils'
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
      const coordinates = get(area, 'coordinates', false);
      const title       = get(area, 'title', '-');
      if (!isEmpty(coordinates) && area.id != id) {
        dispatchBodyModelWired({
          // reverse is needed when creating/updating and getting existing polygons
          [`existingPolygons[${i}]`]      : reverseCoords(coordinates),
          [`existingPolygons[${i}].title`]: title,
        });
      }
    });

  })
  .catch(err => console.log(err));
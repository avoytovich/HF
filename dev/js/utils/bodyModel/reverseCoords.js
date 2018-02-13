import each from 'lodash/each';
import cloneDeep from 'lodash/cloneDeep';

export const reverseCoords = (objWithSexes) => {
  each(objWithSexes, (side, sideKey) => {
    each(side, (sex, sexKey) => {
      each(objWithSexes[sideKey][sexKey], (coordArr, coordArrIndex) => {
        let tempCoordObj = cloneDeep(objWithSexes[sideKey][sexKey][coordArrIndex]);
        objWithSexes[sideKey][sexKey][coordArrIndex].lat = tempCoordObj.lng;
        objWithSexes[sideKey][sexKey][coordArrIndex].lng = tempCoordObj.lat;
      });
    });
  });
  return objWithSexes;
};
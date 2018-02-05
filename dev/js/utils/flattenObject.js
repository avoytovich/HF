import isObject from 'lodash/isObject';

export const flattenObject = (obj) => {
  let toReturn = {};
  for (let prop in obj) {
    // if property is inherited - skip it
    if (!obj.hasOwnProperty(prop)) continue;

    if (isObject(obj[prop])) {
      // if prop is object - call flattenObject on it
      let flatObject = flattenObject(obj[prop]);
      for (let prop2 in flatObject) {
        // if property is inherited - skip it again
        if (!flatObject.hasOwnProperty(prop2)) {
          continue;
        }
        //
        toReturn[prop + '.' + prop2] = flatObject[prop2];
      }
    } else {
      toReturn[prop] = obj[prop];
    }
  }
  return toReturn;
};

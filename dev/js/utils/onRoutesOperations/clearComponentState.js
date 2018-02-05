import get from 'lodash/get';

import { store } from '../../index';
import { PAGE } from '../../config';
import { T } from '../../actions';

export const clearComponentStateOnLeave = (prevState) => {
  const clearingRoutesOnLeave = [
    { path: PAGE.testNew, type: T.TESTING },
  ];

  let route    = get(prevState, 'location.pathname', '');
  let dispatch = store.dispatch;

  clearingRoutesOnLeave.forEach(r => {
    if (route.includes(r.path)) {
      dispatch({ type: `${r.type}_CLEAR` });
    }
  });
};

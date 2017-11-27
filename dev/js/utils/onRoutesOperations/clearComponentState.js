import {
  USER,
} from '../../actions';
import { pathToPage } from '../../utils';
import { store } from '../../index';

export const clearComponentState = (prevState) => {
  let route    = prevState.location.pathname;
  let dispatch = store.dispatch;
  switch (true) {
    //i.e. fullString.includes(partOfString)
    // case route.includes(pathToPage.mealsUpdate):
    //   return dispatch({ type: USER_CLEAR });
  }
};

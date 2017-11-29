import { pathToPage } from '../index';
import { SAVE_USER_TO_STORE, dispatchCommonPayload } from '../../actions';
import { store } from '../../index';
import { PAGE } from '../../config';

export function onAllEnter(nextState, replace) {
  const { userReducer } = store.getState();
  //redirect onAllEnter to client page
  console.log(userReducer);
  if (!userReducer.token) {
    return replace({
      pathname: PAGE.login,
      state   : { nextPathname: nextState.location.pathname }
    })
  }
}

export function onLoginEnter(nextState, replace) {
  const { userReducer } = store.getState();
  //redirect to client page if user logged in and has token saved
  if (userReducer.token) {
    return replace({
      pathname: pathToPage.info,
      state   : { nextPathname: nextState.location.pathname }
    })
  }
}


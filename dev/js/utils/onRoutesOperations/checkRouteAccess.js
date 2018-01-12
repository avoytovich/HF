import { dispatchCommonPayload } from '../../actions';
import { store } from '../../index';
import { PAGE } from '../../config';
import { onRootChange } from '../../utils';

export function onAllEnter(nextState, replace) {
  const { userReducer } = store.getState();
  //redirect onAllEnter to client page
  if (!userReducer.token) {
    return replace({
      pathname: PAGE.login,
      state   : { nextPathname: nextState.location.pathname }
    })
  }
}

export function onAllChange(prevState, nextState, replace) {
  onRootChange(prevState);
  const { userReducer } = store.getState();
  //redirect onAllEnter to client page
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
      pathname: '/',
      state   : { nextPathname: nextState.location.pathname }
    })
  }
}


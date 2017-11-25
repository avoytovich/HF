import { createStore, compose, applyMiddleware } from 'redux';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

//reducer
import rootReducer from '../reducers';

const enhancers = compose(
  applyMiddleware(
    multi,
    thunk,
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export function configureStore () {
  let store = createStore(
    rootReducer,
    {},
    enhancers
  );
  let persistor = persistStore(store);

  return { persistor, store }
}
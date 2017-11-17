//npm-packages
import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

//styles
// import 'react-select/dist/react-select.min.css'
import '../sass/index.sass';

//components
import Main from './components/Main';
import Login from './components/Login/Login';

//reducer
import rootReducer from './reducers';

const enhancers = compose(
  applyMiddleware(multi, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export const store = createStore(
  rootReducer,
  {},
  enhancers
);

export const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <div>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path={'/'}  component={Main} >
        <IndexRoute component={() => <div>hello world</div>} />
      </Route>
      {/*<Route path={'/'}  component={Login} />*/}
    </Router>

    <NotificationsSystem theme={theme}/>

    </div>
  </Provider>
);

render(router, document.getElementById('root'));

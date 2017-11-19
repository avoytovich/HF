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
import { Router, Route, IndexRoute, browserHistory, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';

//styles
// import 'react-select/dist/react-select.min.css'
import '../sass/index.sass';

//components
import Main from './components/Main';
import Login from './components/Login/Login';
import TypicalListPage from './components/TypicalListPage/TypicalListPage';
import {MatrixComponent} from './components/Matrix-Setup';
//reducer
import rootReducer from './reducers';

//constants
import {
  ORGANISATION_PAGE,
  CLINICS_PAGE,
  USERS_PAGE,
  RESOURCE_PAGE,
  TEST_DIAGNOSTIC_FLOW_PAGE
} from './utils/constants'

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
      <Route path={'/'}                     component={Main} >
        <IndexRedirect to="organizations"/>
        <Route path='organizations'         component={() => <TypicalListPage {...ORGANISATION_PAGE}/>} />
        <Route path='clinics'               component={() => <TypicalListPage {...CLINICS_PAGE}/>} />
        <Route path='users'                 component={() => <TypicalListPage {...USERS_PAGE}/>} />
        <Route path='resource'              component={() => <TypicalListPage {...RESOURCE_PAGE}/>} />
        <Route path='matrix-setup'          component={MatrixComponent}>
          <IndexRedirect to="diagnosis"/>
          <Route path='diagnosis'           component={() => <div>Diagnosis</div>} />
          <Route path='conditions'          component={() => <div>Conditions</div>} />
          <Route path='treatments'          component={() => <div>Treatments</div>} />
          <Route path='packages'            component={() => <div>Packages</div>} />
          <Route path='evaluation'          component={() => <div>Evaluation</div>} />
          <Route path='meta-controls'       component={() => <div>Meta Controls</div>} />
          <Route path='achievements'        component={() => <div>Achievements</div>} />
          <Route path='exercises'           component={() => <div>Exercises</div>} />
          <Route path='tests'               component={() => <div>Tests</div>} />
        </Route>
        <Route path='test-diagnostic-flow'  component={() => <TypicalListPage {...TEST_DIAGNOSTIC_FLOW_PAGE}/>} />
        <Redirect from="*" to="organizations"/>
      </Route>
      {/*<Route path={'/'}  component={Login} />*/}
    </Router>

    <NotificationsSystem theme={theme}/>

    </div>
  </Provider>
);

render(router, document.getElementById('root'));

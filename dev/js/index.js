import 'babel-polyfill';
//npm-packages
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { PersistGate } from 'redux-persist/es/integration/react';
import watch from 'redux-watch'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// router
import { Router, Route, IndexRoute, browserHistory, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';

const Switch = require('react-router').Switch;

// styles
// import 'react-select/dist/react-select.min.css'
import '../sass/index.sass';

//components

import Main from './components/Main';

import Login from './components/auth/Login/Login';
import SignUp from './components/auth/SignUp/SignUp';
import ResetPassword from './components/auth/ResetPassword/ResetPassword';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
// import TypicalListPage from './components/TypicalListPage/TypicalListPage';
import TypicalListPage from './components/common/TypicalListPage/TypicalListPage';

 import {
   MatrixComponent,
   DiagnosisComponent,
//   ConditionsComponent,
//   TreatmentsComponent,
   PackagesComponent,
//   EvaluationComponent,
//   MetaControlsComponent,
//   AchievementsComponent,
//   ExercisesComponent,
//   TestsComponent,
   CreateQuestionComponent
 } from './components/matrix/Matrix-Setup';

//constants
 import {
   ORGANISATION_PAGE,
   CLINICS_PAGE,
   USERS_PAGE,
   RESOURCE_PAGE,
   TEST_DIAGNOSTIC_FLOW_PAGE
 } from './utils/constants/pageContent';

import { PAGE } from './config';
import { onAllEnter } from './utils';

import {
  dispatchCommonPayloadWired,
} from './actions';


import { configureStore } from './config/store';

export const { persistor, store } = configureStore();
export const history = syncHistoryWithStore(browserHistory, store);

const onBeforeLift = () => {
  const {
    userReducer,
    commonReducer,
  } = store.getState();
  dispatchCommonPayloadWired({
    currentLanguage: commonReducer.languages[userReducer.language]
  });

  // watcher - will change lang on change 'language' prop in userReducer
  const w = watch(store.getState, 'userReducer.language');
  store.subscribe(w((newVal, oldVal, objectPath) => {
    dispatchCommonPayloadWired({
      currentLanguage: commonReducer.languages[newVal]
    });
  }))
};

const router = (
  <Provider store={store}>
    <div>
    <PersistGate
      loading={null}
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
    <Router
      history={history}
      onUpdate={() => window.scrollTo(0, 0)}
    >
      <Route path={PAGE.signup}     component={SignUp} />
      <Route path={PAGE.login}      component={Login} />
      <Route path={PAGE.passReset}  component={ResetPassword} />
      <Route path={PAGE.passForgot} component={ForgotPassword} />
      <Route
        path={'/'}
        component={Main}
        onEnter={onAllEnter}
        onChange={onAllEnter}
      >

        <IndexRedirect to="organizations"/>

        <Route path='organizations'         component={() => <div>ORGANISATION_PAGE</div>} />
        <Route path='clinics'               component={() => <div>CLINICS_PAGE</div>} />
        <Route path='users'                 component={() => <div>USERS_PAGE</div>} />
        <Route path='resource'              component={() => <div>RESOURCE_PAGE</div>} />
        <Route path='matrix-setup'          component={ MatrixComponent }>

          <IndexRedirect to="diagnosis"/>

          <Route path='diagnosis'           component={(props) => <DiagnosisComponent {...props}/>} />
          {/*<Route path='conditions'          component={ ConditionsComponent } />*/}
          {/*<Route path='treatments'          component={ TreatmentsComponent } />*/}
          <Route path='packages'            component={(props) => <PackagesComponent {...props} />} />
          {/*<Route path='evaluation'          component={ EvaluationComponent } />*/}
          {/*<Route path='meta-controls'       component={ MetaControlsComponent } />*/}
          {/*<Route path='achievements'        component={ AchievementsComponent } />*/}
          {/*<Route path='exercises'           component={ ExercisesComponent } />*/}
          {/*<Route path='tests'               component={ TestsComponent } />*/}
          <Redirect from="*" to="diagnosis"/>
        </Route>

        <Route path='test-diagnostic-flow'  component={() => <div>TEST_DIAGNOSTIC_FLOW_PAGE</div>} />

        {/* Temporary path Todo: Change routes to react-router-dom ?*/}
        <Route path='diagnosis-create'    component={ CreateQuestionComponent } />

        {/*<Redirect from="*" to="organizations"/>*/}

        {/*<Route path={'/login'}  component={Login} />*/}

      </Route>


    </Router>


    </PersistGate>
    <NotificationsSystem theme={theme}/>
  </div>
  </Provider>
);

render(router, document.getElementById('root'));

import 'babel-polyfill';
//npm-packages
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { PersistGate } from 'redux-persist/es/integration/react';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//router
import { Router, Route, IndexRoute, browserHistory, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';

const Switch = require('react-router').Switch;

//styles
// import 'react-select/dist/react-select.min.css'
import '../sass/index.sass';

//components
import Main from './components/Main';
import Login from './components/Login/Login';
import TypicalListPage from './components/TypicalListPage/TypicalListPage';
import {
  MatrixComponent,
  DiagnosisComponent,
  ConditionsComponent,
  TreatmentsComponent,
  PackagesComponent,
  EvaluationComponent,
  MetaControlsComponent,
  AchievementsComponent,
  ExercisesComponent,
  TestsComponent,
  CreateQuestionComponent
} from './components/Matrix-Setup';

//constants
import {
  ORGANISATION_PAGE,
  CLINICS_PAGE,
  USERS_PAGE,
  RESOURCE_PAGE,
  TEST_DIAGNOSTIC_FLOW_PAGE
} from './utils/constants'

import { configureStore } from './config/store';

export const { persistor, store } = configureStore();
export const history = syncHistoryWithStore(browserHistory, store);
const onBeforeLift = () => {
  // take some action before the gate lifts (gate prevent rendering until store is hydrated from local storage)
}

const router = (
  <Provider store={store}>
    <PersistGate
      loading={null}
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
    <div>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path={'/'}                     component={Main} >
        <IndexRedirect to="organizations"/>
        <Route path='organizations'         component={() => <TypicalListPage {...ORGANISATION_PAGE}/>} />
        <Route path='clinics'               component={() => <TypicalListPage {...CLINICS_PAGE}/>} />
        <Route path='users'                 component={() => <TypicalListPage {...USERS_PAGE}/>} />
        <Route path='resource'              component={() => <TypicalListPage {...RESOURCE_PAGE}/>} />
        <Route path='matrix-setup'          component={ MatrixComponent }>

          <IndexRedirect to="diagnosis"/>
          <Route path='diagnosis'           component={ DiagnosisComponent } />
          <Route path='conditions'          component={ ConditionsComponent } />
          <Route path='treatments'          component={ TreatmentsComponent } />
          <Route path='packages'            component={ PackagesComponent } />
          <Route path='evaluation'          component={ EvaluationComponent } />
          <Route path='meta-controls'       component={ MetaControlsComponent } />
          <Route path='achievements'        component={ AchievementsComponent } />
          <Route path='exercises'           component={ ExercisesComponent } />
          <Route path='tests'               component={ TestsComponent } />

        </Route>
        <Route path='test-diagnostic-flow'  component={() => <TypicalListPage {...TEST_DIAGNOSTIC_FLOW_PAGE}/>} />

        {/* Temporary path Todo: Change routes to react-router-dom ?*/}
        <Route path='diagnosis-create'    component={ CreateQuestionComponent } />

        <Redirect from="*" to="organizations"/>
      </Route>
      {/*<Route path={'/'}  component={Login} />*/}
    </Router>

    <NotificationsSystem theme={theme}/>

    </div>
    </PersistGate>
  </Provider>
);

render(router, document.getElementById('root'));

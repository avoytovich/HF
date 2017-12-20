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

// styles
// import 'react-select/dist/react-select.min.css'
import '../sass/index.sass';

//components
import Main                           from './components/Main';
import Login                          from './components/auth/Login/Login';
import SignUp                         from './components/auth/SignUp/SignUp';
import ResetPassword                  from './components/auth/ResetPassword/ResetPassword';
import ForgotPassword                 from './components/auth/ForgotPassword/ForgotPassword';
import Companies                      from './components/users/Companies/Companies';
import Clinics                        from './components/users/Clinics/Clinics';
import Profile                        from './components/users/Profile/Profile';
import SimpleUsers                          from './components/users/Users/SimpleUsers';
import OrganizationsUsers                          from './components/users/Users/OrganizationsUsers';
import ClinicsUsers                          from './components/users/Users/ClinicsUsers';
import AssetsList                     from './components/assets/AssetsList/AssetsList';
import TestsList                     from './components/testing/TestsList/TestsList';
import {
   MatrixComponent,
   DiagnosisComponent,
   ConditionsComponent,
   TreatmentsComponent,
   EvaluationComponent,
   PackagesComponent,
   ExercisesComponent,
//   MetaControlsComponent,
//   AchievementsComponent,
//   TestsComponent,
   CreateQuestionComponent,
  CreateConditionComponent,
  CreateTreatmentsComponent,
  CreateEvaluationComponent,
  CreatePackageComponent
 }                                    from './components/matrix/Matrix-Setup';

import { PAGE }                       from './config';
import { onAllEnter }                 from './utils';
import { dispatchCommonPayloadWired } from './actions';


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

      <Route path={'/'} component={Main} onEnter={onAllEnter} onChange={onAllEnter}>

        <IndexRedirect to={PAGE.companies}/>

        <Route path={PAGE.companies}         component={Companies} />
        <Route path={PAGE.clinics}           component={Clinics} />
        <Route path={PAGE.simpleUsers}       component={SimpleUsers} />
        <Route path={PAGE.organizationsUsers}             component={OrganizationsUsers} />
        <Route path={PAGE.clinicsUsers}             component={ClinicsUsers} />
        <Route path={PAGE.assets}            component={AssetsList} />
        <Route path={PAGE.clinicProfile}     component={Profile} />
        <Route path={PAGE.test}              component={TestsList} />
        <Route path={PAGE.matrixSetup}       component={ MatrixComponent }>

          <IndexRedirect to="diagnosis"/>

          <Route path='diagnosis'           component={(props) => <DiagnosisComponent  {...props}/>}/>
          <Route path='conditions'          component={(props) => <ConditionsComponent {...props}/>} />
          <Route path='treatments'          component={(props) => <TreatmentsComponent {...props}/>} />
          <Route path='packages'            component={(props) => <PackagesComponent   {...props}/>} />
          <Route path='evaluations'         component={(props) => <EvaluationComponent {...props} />} />
          <Route path='exercises'           component={(props) => <ExercisesComponent  {...props}/>} />

          {/*<Route path='tests'               component={ TestsComponent } />*/}
          {/*<Route path='meta-controls'       component={ MetaControlsComponent } />*/}
          {/*<Route path='achievements'        component={ AchievementsComponent } />*/}
          <Redirect from="*" to="diagnosis"/>
        </Route>
        evaluation
        <Route path='test-diagnostic-flow'  component={() => <div>TEST_DIAGNOSTIC_FLOW_PAGE</div>} />

        {/* Temporary path Todo: Change routes to react-router-dom ?*/}
        <Route path='diagnosis-create/:id'   component={(props) => <CreateQuestionComponent {...props}/>} />
        <Route path='diagnosis-create-new'   component={(props) => <CreateQuestionComponent {...props}/>} />

        <Route path='conditions-create/:id'  component={(props) => <CreateConditionComponent {...props}/>} />
        <Route path='conditions-create-new'  component={(props) => <CreateConditionComponent {...props}/>} />

        <Route path='treatments-create/:id'  component={(props) => <CreateTreatmentsComponent {...props}/>} />
        <Route path='treatments-create-new'  component={(props) => <CreateTreatmentsComponent {...props}/>} />

        <Route path='evaluations-create/:id' component={(props) => <CreateEvaluationComponent {...props}/>} />
        <Route path='evaluations-create-new' component={(props) => <CreateEvaluationComponent {...props}/>} />

        <Route path='packages-create/:id'    component={(props) => <CreatePackageComponent {...props}/>} />
        <Route path='packages-create-new'    component={(props) => <CreatePackageComponent {...props}/>} />

      </Route>
    </Router>
    </PersistGate>
    <NotificationsSystem theme={theme}/>
  </div>
  </Provider>
);

render(router, document.getElementById('root'));

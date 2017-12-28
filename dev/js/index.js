import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { PersistGate } from 'redux-persist/es/integration/react';
import watch from 'redux-watch'
import { Router, Route, IndexRoute, browserHistory, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import '../sass/index.sass';
import { C }                          from './components'
import { PAGE }                       from './config';
import { onAllEnter }                 from './utils';
import { dispatchCommonPayloadWired } from './actions';
import { configureStore }             from './config/store';

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
  <PersistGate
    loading={null}
    onBeforeLift={onBeforeLift}
    persistor={persistor}
  >
    <Provider store={store}>
      <div>
        <Router
          history={history}
          onUpdate={() => window.scrollTo(0, 0)}
        >
          <Route path={PAGE.signup} component={C.SignUp}/>
          <Route path={PAGE.login} component={C.Login}/>
          <Route path={PAGE.passReset} component={C.ResetPassword}/>
          <Route path={PAGE.passForgot} component={C.ForgotPassword}/>

          <Route path={'/'} component={C.Main} onEnter={onAllEnter} onChange={onAllEnter}>

            <IndexRedirect to={PAGE.companies}/>

        <Route path={PAGE.companies}          component={C.Companies} />
        <Route path={PAGE.clinics}            component={C.Clinics} />
        <Route path={PAGE.simpleUsers}        component={C.SimpleUsers} />
        <Route path={PAGE.organizationsUsers} component={C.OrganizationsUsers} />
        <Route path={PAGE.clinicsUsers}       component={C.ClinicsUsers} />
        <Route path={PAGE.assets}             component={C.AssetsList} />
        <Route path={PAGE.clinicProfile}      component={C.Profile} />
        <Route path={PAGE.companyProfile}      component={C.Profile} />
        <Route path={PAGE.clinicOwnUsers}      component={C.ClinicOwnUsers} />
        <Route path={PAGE.companyOwnUsers}      component={C.CompanyOwnUsers} />
        <Route path={PAGE.test}               component={C.TestsList} />
        <Route path={PAGE.testNew}            component={C.TestNew} />

            <Route path={PAGE.matrixSetup} component={ C.MatrixComponent }>

              <IndexRedirect to="diagnosis"/>

              <Route path='body-area' component={(props) => <C.BodyAreaComponent {...props}/>}/>
              <Route path='diagnosis' component={(props) => <C.DiagnosisComponent  {...props}/>}/>
              <Route path='conditions' component={(props) => <C.ConditionsComponent {...props}/>}/>
              <Route path='treatments' component={(props) => <C.TreatmentsComponent {...props}/>}/>
              <Route path='packages' component={(props) => <C.PackagesComponent   {...props}/>}/>
              <Route path='evaluations' component={(props) => <C.EvaluationComponent {...props} />}/>
              <Route path='exercises' component={(props) => <C.ExercisesComponent  {...props}/>}/>

              {/*<Route path='tests'               component={ TestsComponent } />*/}
              {/*<Route path='meta-controls'       component={ MetaControlsComponent } />*/}
              {/*<Route path='achievements'        component={ AchievementsComponent } />*/}
              <Redirect from="*" to="diagnosis"/>
            </Route>

            {/* Temporary path Todo: Change routes to react-router-dom ?*/}
            <Route path='body-area-create/:id' component={(props) => <C.CreateBodyAreaComponent {...props}/>}/>
            <Route path='body-area-create-new' component={(props) => <C.CreateBodyAreaComponent {...props}/>}/>

            <Route path='diagnosis-create/:id' component={(props) => <C.CreateQuestionComponent {...props}/>}/>
            <Route path='diagnosis-create-new' component={(props) => <C.CreateQuestionComponent {...props}/>}/>

            <Route path='conditions-create/:id' component={(props) => <C.CreateConditionComponent {...props}/>}/>
            <Route path='conditions-create-new' component={(props) => <C.CreateConditionComponent {...props}/>}/>

            <Route path='treatments-create/:id' component={(props) => <C.CreateTreatmentsComponent {...props}/>}/>
            <Route path='treatments-create-new' component={(props) => <C.CreateTreatmentsComponent {...props}/>}/>

            <Route path='evaluations-create/:id' component={(props) => <C.CreateEvaluationComponent {...props}/>}/>
            <Route path='evaluations-create-new' component={(props) => <C.CreateEvaluationComponent {...props}/>}/>

            <Route path='packages-create/:id' component={(props) => <C.CreatePackageComponent {...props}/>}/>
            <Route path='packages-create-new' component={(props) => <C.CreatePackageComponent {...props}/>}/>

            <Route path='exercise-create/:id' component={(props) => <C.CreateExerciseComponent {...props}/>}/>
            <Route path='exercise-create-new' component={(props) => <C.CreateExerciseComponent {...props}/>}/>

          </Route>
        </Router>
        <NotificationsSystem theme={theme}/>
      </div>
    </Provider>
  </PersistGate>
);

render(router, document.getElementById('root'));

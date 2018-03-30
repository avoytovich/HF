import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Router, Route, IndexRoute, browserHistory, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import '../sass/index.sass';
import { C }                          from './components'
import { PAGE }                       from './config';
import {
  onAllEnter,
  onAllChange,
  storeSubscriptions,
}                                     from './utils';
import { dispatchCommonPayloadWired } from './actions';
import { configureStore }             from './config/store';

export const { persistor, store } = configureStore();
export const history = syncHistoryWithStore(browserHistory, store);

const onBeforeLift = () => {
  const {
    userReducer: {
      language
    },
    commonReducer: {
      languages
    },
  } = store.getState();
  dispatchCommonPayloadWired({
    currentLanguage: languages[language || 'en']
  });

  storeSubscriptions(store)
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

          <Route path={PAGE.personalCabinet} component={C.PersonalCabinetMain}>
            <Route path={PAGE.personalCabinetUsers}  component={C.PersonalCabinetUsers} />
            <Route path={PAGE.personalCabinetUserProfile}  component={C.SimpleUserProfile} />
            <Route path={PAGE.personalCabinetProfile}  component={C.PersonalCabinetProfile} />
            <Route path={PAGE.personalCabinetBilling}  component={C.PersonalCabinetBilling} />
          </Route>

          <Route path={'/'} component={C.Main} onEnter={onAllEnter} onChange={onAllChange}>

            <IndexRedirect to={PAGE.companies}/>

            <Route path={PAGE.companies}          component={C.Companies} />
            <Route path={PAGE.clinics}            component={C.Clinics} />
            <Route path={PAGE.simpleUsers}        component={C.SimpleUsers} />
            <Route path={PAGE.organizationsUsers} component={C.OrganizationsUsers} />
            <Route path={PAGE.clinicsUsers}       component={C.ClinicsUsers} />
            <Route path={PAGE.simpleUsersProfile}        component={C.SimpleUserProfile} />
            <Route path={PAGE.organizationsUsersProfile} component={C.SimpleUserProfile} />
            <Route path={PAGE.clinicsUsersProfile}       component={C.SimpleUserProfile} />
            <Route path={PAGE.tariffs}       component={C.Tariffs}>
              <IndexRedirect to={PAGE.tariffPlans}/>
              <Route path={PAGE.tariffPlans} component={C.TariffPlans}/>
              <Route path={PAGE.pricingGroups } component={C.PricingGroups}/>
              <Redirect from="*" to={PAGE.tariffPlans}/>
            </Route>

            <Route path={PAGE.assets}             component={C.AssetsComponent} >
                <IndexRedirect to={PAGE.assetsDiagnostics}/>
                <Route path={PAGE.assetsExercises} component={C.AssetsExercisesList}/>
                <Route path={PAGE.assetsDiagnostics } component={C.AssetsDiagnosticsList}/>
                <Redirect from="*" to={PAGE.assetsDiagnostics}/>
            </Route>

        <Route path={PAGE.clinicProfile}      component={C.Profile} />
        <Route path={PAGE.companyProfile}      component={C.Profile} />
        <Route path={PAGE.clinicOwnUsers}      component={C.ClinicOwnUsers} />
        <Route path={PAGE.companyOwnUsers}      component={C.CompanyOwnUsers} />
        <Route path={PAGE.companyOwnUsersProfile}     component={C.SimpleUserProfile} />
        <Route path={PAGE.clinicOwnUsersProfile}      component={C.SimpleUserProfile} />
        <Route path={PAGE.test}               component={C.TestsList} />
        <Route path={PAGE.appScreenInfo}      component={C.AppScreenInfoContainer} />
        <Route path={PAGE.testNew}            component={C.TestNew} />

            <Route path={PAGE.matrixSetup} component={ C.MatrixComponent }>

              <IndexRedirect to="diagnosis"/>

              <Route path='diagnosis'   component={(props) => <C.DiagnosisComponent  {...props}/>}/>
              <Route path='body-area'   component={(props) => <C.BodyAreaComponent   {...props}/>}/>
              <Route path='conditions'  component={(props) => <C.ConditionsComponent {...props}/>}/>
              <Route path='treatments'  component={(props) => <C.TreatmentsComponent {...props}/>}/>
              <Route path='packages'    component={(props) => <C.PackagesComponent   {...props}/>}/>
              <Route path='levelUps'    component={(props) => <C.LevelUpComponent    {...props}/>}/>
              <Route path='evaluations' component={(props) => <C.EvaluationComponent {...props}/>}/>
              <Route path='exercises'   component={(props) => <C.Exercises {...props}/>}/>

              {/*<Route path='tests'               component={ TestsComponent } />*/}
              {/*<Route path='meta-controls'       component={ MetaControlsComponent } />*/}
              {/*<Route path='achievements'        component={ AchievementsComponent } />*/}
              <Redirect from="*" to="diagnosis"/>
            </Route>

            {/* Temporary path Todo: Change routes to react-router-dom ?*/}
            <Route path='body-area-create/:id' component={C.CreateBodyAreaComponent}/>
            <Route path='body-area-create-new' component={C.CreateBodyAreaComponent}/>

            <Route path='diagnosis-create/:id' component={C.CreateQuestionComponent}/>
            <Route path='diagnosis-create-new' component={C.CreateQuestionComponent}/>

            <Route path='conditions-create/:id' component={C.CreateConditionComponent}/>
            <Route path='conditions-create-new' component={C.CreateConditionComponent}/>

            <Route path='treatments-create/:id' component={C.CreateTreatmentsComponent}/>
            <Route path='treatments-create-new' component={C.CreateTreatmentsComponent}/>

            <Route path='level-up-create/:id' component={C.CreateLevelUpComponent}/>
            <Route path='level-up-create-new' component={C.CreateLevelUpComponent}/>

            <Route path='evaluation-create/:id' component={C.CreateEvaluationComponent}/>
            <Route path='evaluation-create-new' component={C.CreateEvaluationComponent}/>

            <Route path='packages-create/:id' component={C.Package}/>
            <Route path='packages-create-new' component={C.Package}/>

            <Route path='exercise-create/:id' component={C.CreateExercise}/>
            <Route path='exercise-create-new' component={C.CreateExercise}/>

            <Route path={PAGE.chat}      component={C.Chat} />
          </Route>
        </Router>
        <NotificationsSystem theme={theme}/>
      </div>
    </Provider>
  </PersistGate>
);

render(router, document.getElementById('root'));

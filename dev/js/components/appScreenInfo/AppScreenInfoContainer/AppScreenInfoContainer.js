import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  dispatchAppInfo,
}                                   from '../../../actions';
import { CreateItemNavButtons }     from '../../common';
import Grid                         from 'material-ui/Grid';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../common/Input/Input';


class AppScreenInfoContainer extends Component {
  componentWillMount()  {
    dispatchAppInfo();
  }


  render(){

    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        home_screen,
        start_session_screen,
        details_session_screen,
        self_diagnosis_screen,
        health_history_screen,
        pain_profile_screen,
        diagnostic_test_screen,
        progress_screen,
        prognosis_screen,
        schedule_screen,
        reminders_screen,
        favourite_exercises_screen,
        activity_journal_screen,
        profile_screen
      },
    } = this.props;


    const placeholder = 'Enter message';

    return(
      <div className="app-screen-info-container">


        <CreateItemNavButtons
          title={'App Info'}
          showLangSwitcher={true}
          onCancelClick={this.cancel}
          cancelLabel={'Cancel'}
          onSaveClick={() => {}}
          saveLabel={'Save'}
        />


        <Grid container style={{padding: '20px'}}>
          <Grid item sm={12} md={6}>

            {/*Home Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='questionTitle'
                  value={home_screen}
                  className="MUIControl"
                  label="Home Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Start Session Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={start_session_screen}
                  className="MUIControl"
                  label="Start Session Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Details Session Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={details_session_screen}
                  className="MUIControl"
                  label="Details Session Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Self Diagnosis Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={self_diagnosis_screen}
                  className="MUIControl"
                  label="Self Diagnosis Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Health History Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={health_history_screen}
                  className="MUIControl"
                  label="Health History Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Pain Profile Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={pain_profile_screen}
                  className="MUIControl"
                  label="Pain Profile Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Diagnostic Test Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={diagnostic_test_screen}
                  className="MUIControl"
                  label="Diagnostic Test Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Progress Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={progress_screen}
                  className="MUIControl"
                  label="Progress Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Prognosis Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={prognosis_screen}
                  className="MUIControl"
                  label="Prognosis Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Schedule Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={schedule_screen}
                  className="MUIControl"
                  label="Schedule Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Reminders Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={reminders_screen}
                  className="MUIControl"
                  label="Reminders Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Favourite Exercises Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={favourite_exercises_screen}
                  className="MUIControl"
                  label="Favourite Exercises Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Activity Journal Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={activity_journal_screen}
                  className="MUIControl"
                  label="Activity Journal Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

            {/*Profile Screen*/}

            <Grid container className="row-item">
              <Grid item sm={12}>
                <Input
                  id='start_session_screen'
                  value={profile_screen}
                  className="MUIControl"
                  label="Profile Screen"
                  reducer={ createDiagnosisQuestion }
                  placeholder={ placeholder }
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>

          </Grid>
        </Grid>



      </div>
    )
  }
}

const mapStateToProps   = state => ({
  createDiagnosisQuestion: state.appScreenInfoReducer,
  commonReducer          : state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(AppScreenInfoContainer);
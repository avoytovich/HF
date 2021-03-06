import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  dispatchAppInfo,
  saveAppInfo,
} from '../../../actions';
import { CreateItemNavButtons } from '../../common';
import Grid from 'material-ui/Grid';
import Input from '../../common/Input/Input';


class AppScreenInfoContainer extends Component {

  state = {
    list: [
      { key: 'home_screen', label: 'Home Screen' },
      { key: 'start_session_screen', label: 'Start Session Screen' },
      { key: 'details_session_screen', label: 'Details Session Screen' },
      { key: 'self_diagnosis_screen', label: 'Self Diagnosis Screen' },
      { key: 'health_history_screen', label: 'Health History Screen' },
      { key: 'pain_profile_screen', label: 'Pain Profile Screen' },
      { key: 'diagnostic_test_screen', label: 'Diagnostic Test Screen' },
      { key: 'progress_screen', label: 'Progress Screen' },
      { key: 'prognosis_screen', label: 'Prognosis Screen' },
      { key: 'schedule_screen', label: 'Schedule & Reminders Screen' },
      { key: 'favourite_exercises_screen', label: 'Favourite Exercises Screen' },
      { key: 'activity_journal_screen', label: 'Activity Journal Screen' },
      { key: 'profile_screen', label: 'Profile Screen' },
      { key: 'therapy_control_screen', label: 'Therapy Control Screen' },
      { key: 'therapy_information_screen', label: 'Therapy Info Screen' }
    ]
  };


  componentWillMount() {
    dispatchAppInfo();
  }

  Save = (reducer, list) => {
    const result = list.reduce((res, item) => {
      const { key } = item;
      const value = reducer[key];
      return Object.assign({}, res, { [key]: value });
    }, {});
    saveAppInfo(result);
  };

  render() {

    const { AppScreenInfoReducer, lang } = this.props;
    const placeholder = 'Enter message';

    return (
      <div className="app-screen-info-container">

        <CreateItemNavButtons
          title={'App Info'}
          showLangSwitcher={true}
          onSaveClick={() => this.Save(AppScreenInfoReducer, this.state.list)}
          saveLabel={'Save'}
          showCancel={false}
          langValue={lang}
        />

        <Grid style={{ padding: '20px' }}>
          {this.state.list.map((item, index) =>
            <Grid container
              className="row-item"
              key={index}
            >
              <Grid item sm={6}>
                <Input
                  id={`${item.key}.information.${lang}`}
                  className="MUIControl"
                  label={`${item.label} Information`}
                  reducer={AppScreenInfoReducer}
                  placeholder={placeholder}
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
              <Grid item sm={6}>
                <Input
                  id={`${item.key}.instruction.${lang}`}
                  className="MUIControl"
                  label={`${item.label} Instruction`}
                  reducer={AppScreenInfoReducer}
                  placeholder={placeholder}
                  multiline={true}
                  rows="5"
                  cols="60"
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  AppScreenInfoReducer: state.AppScreenInfoReducer,
  lang: state.createDiagnosisQuestion.questionAnswerLang,
  commonReducer: state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({ dispatch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppScreenInfoContainer);
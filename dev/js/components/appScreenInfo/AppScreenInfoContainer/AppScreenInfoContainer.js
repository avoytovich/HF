import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  dispatchAppInfo,
  saveAppInfo,
}                                   from '../../../actions';
import { CreateItemNavButtons }     from '../../common';
import Grid                         from 'material-ui/Grid';
import Input                        from '../../common/Input/Input';


class AppScreenInfoContainer extends Component {

  state = {
    list: [
      { key: 'home_screen',                 label: 'Home Screen'                },
      { key: 'start_session_screen',        label: 'Start Session Screen'       },
      { key: 'details_session_screen',      label: 'Details Session Screen'     },
      { key: 'self_diagnosis_screen',       label: 'Self Diagnosis Screen'      },
      { key: 'health_history_screen',       label: 'Health History Screen'      },
      { key: 'pain_profile_screen',         label: 'Pain Profile Screen'        },
      { key: 'diagnostic_test_screen',      label: 'Diagnostic Test Screen'     },
      { key: 'progress_screen',             label: 'Progress Screen'            },
      { key: 'prognosis_screen',            label: 'Prognosis Screen'           },
      { key: 'schedule_screen',             label: 'Schedule Screen'            },
      { key: 'reminders_screen',            label: 'Reminders Screen'           },
      { key: 'favourite_exercises_screen',  label: 'Favourite Exercises Screen' },
      { key: 'activity_journal_screen',     label: 'Activity Journal Screen'    },
      { key: 'profile_screen',              label: 'Profile Screen'             }
    ]
  };


  componentWillMount() {
    dispatchAppInfo();
  }

  Save = (reducer, list) => {
    const result = list.reduce((res, item) => {
      const { key } = item;
      const value = reducer[key];
      return Object.assign({}, res, { [key]: value } );
    }, {});
    saveAppInfo(result);
  };

  render(){

    const { AppScreenInfoReducer, lang } = this.props;
    const placeholder = 'Enter message';

    return(
      <div className="app-screen-info-container">

        <CreateItemNavButtons
          title={'App Info'}
          showLangSwitcher={true}
          onCancelClick={this.cancel}
          cancelLabel={'Cancel'}
          onSaveClick={() => this.Save(AppScreenInfoReducer, this.state.list)}
          saveLabel={'Save'}
          langValue={lang}
        />

        <Grid container style={{padding: '20px'}}>
          <Grid item sm={12} md={6}>
            {this.state.list.map((item, index) => {
              const value = AppScreenInfoReducer[item.key];
              return <Grid container
                      className="row-item"
                      key={index}>
                  <Grid item sm={12}>
                    <Input
                      id={`${item.key}.${lang}`}
                      value={value[lang]}
                      className="MUIControl"
                      label={item.label}
                      reducer={ AppScreenInfoReducer }
                      placeholder={ placeholder }
                      multiline={true}
                      rows="5"
                      cols="60"
                    />
                  </Grid>
                </Grid>
              })
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps   = state => ({
  AppScreenInfoReducer : state.AppScreenInfoReducer,
  lang                 : state.createDiagnosisQuestion.questionAnswerLang,
  commonReducer        : state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(AppScreenInfoContainer);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import pick from 'lodash/pick'
import each from 'lodash/each'
import pickBy from 'lodash/pickBy'
import Grid from 'material-ui/Grid';

// UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import Input from '../../common/Input/Input';
import { diagnosConsts } from '../consts'
// import Switch from '../../common/Switch/Switch';
import Select from '../../common/Select/Select';
import DynamicQuestions from '../DynamicQuestions/DynamicQuestions';
import {
  createTestWired,
  checkQuestionWired,
} from '../../../actions';
import {
  PAGE,
  pickKeys,
} from '../../../config';

class TestNew extends Component {
  _prepareData = (data) => {
    let prepData     = pick(data, pickKeys.testing);
    prepData.answers = pickBy(prepData, el => el.value);
    prepData.user_id = this.props.userReducer.user_id;
    prepData.type    = 'diagnostic';
    return prepData;
  };

  _prepareDataForCheckQuestion = (data, step) => {
    let currentQKeysToSend = data.questions.filter(q => q.step == step).map(q => q.key);
    if (currentQKeysToSend.includes('vas_areas')) {
      each(data.vas_areas.value, (val, prop) => {
        data[`vas_pain_level_area_${val}`] = { value: data.vas_pain_level_area_, type: 'single' };
        data[`vas_pain_type_area_${val}`]  = { value: data.vas_pain_type_area_, type: 'single' };
        currentQKeysToSend.push(`vas_pain_level_area_${val}`);
        currentQKeysToSend.push(`vas_pain_type_area_${val}`);
      });
    }
    return {
      answers: pick(data, currentQKeysToSend),
      step,
    };
  };

  _finalSubmit = () => {
    const {
      testingReducer,
      testingReducer: {
        step,
        testId,
      }
    } = this.props;
   if (step > 0) {
     let data = this._prepareDataForCheckQuestion(testingReducer, step);
     checkQuestionWired(testId, data);
   } else {
     createTestWired(this._prepareData(testingReducer));
   }
  };

  render() {
    const {
      testingReducer,
      testingReducer: {
        q_age,
        q_sex,
      }
    } = this.props;
    return (
      <div className="testing-container">
        <AppBar
          color="default"
          position="static"
        >
          <Toolbar className="AppBar">
            <div className="upload-header-title-container">
              <p> Test </p>
            </div>

            <div className="testing-header-control-container">
              {/*<Switch*/}
              {/*label='Deactivated'*/}
              {/*/>*/}
              <p
                className="testing-header-cancel"
                onClick={() => browserHistory.push(PAGE.test)}
              >
                CANCEL
              </p>
              <Button
                raised
                dense
                onClick={() => this._finalSubmit()}
                color="primary"
              >
                Next
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <Grid container spacing={0} className="border-bottom">
          <Grid item xs={12}>
            <div className="testing-inner-container border-bottom">
              <Input
                id='title'
                reducer={testingReducer}
                label='Title'
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="testing-inner-container-long">
              <p className="testing-inner-sub-header">
                Profile
              </p>
            </div>
          </Grid>

          <Grid item xs={5}>
            <div className="testing-inner-container-long">

              <Select
                options={diagnosConsts.languages}
                id='q_lang.value'
                style={{ width: "100%" }}
                reducer={testingReducer}
                label='Language of questions'
              />
              <Select
                options={diagnosConsts.measurements}
                id='q_metric.value'
                style={{ width: "100%" }}
                reducer={testingReducer}
                label='Measurements'
              />
              <Select
                options={diagnosConsts.sex}
                id='q_sex.value'
                style={{ width: "100%" }}
                reducer={testingReducer}
                label='Sex'
              />
              {
                q_age.value <= 49 && q_age.value >= 15 && q_sex.value === 2 &&
                <Select
                  options={diagnosConsts.pregnant}
                  id='q_pregnant.value'
                  style={{ width: "100%" }}
                  reducer={testingReducer}
                  label='Are you pregnant?'
                />
              }
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="testing-inner-container-long">
              <Grid container spacing={24}>

                <Grid item xs={6}>
                  <Input
                    type="number"
                    style={{ width: '100%' }}
                    id='q_age.value'
                    reducer={testingReducer}
                    label='Your age'
                  />
                </Grid>

                <Grid item xs={6}/>

                <Grid item xs={6}>
                  <Input
                    type="number"
                    style={{ width: '100%' }}
                    id='q_weight.value'
                    reducer={testingReducer}
                    label='Weight (kg)'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    type="number"
                    style={{ width: '100%' }}
                    id='q_height.value'
                    reducer={testingReducer}
                    label='Your height (cm)'
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>

        </Grid>

        <DynamicQuestions />

      </div>
    )
  }
}

TestNew.propTypes = {
  toggleModal: PropTypes.func,
  headerTitle: PropTypes.string
};

const mapStateToProps = state => ({
  testingReducer: state.testingReducer,
  userReducer: state.userReducer,
});

export default connect(mapStateToProps)(TestNew);
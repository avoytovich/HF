import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import Grid from 'material-ui/Grid';

// UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import Input from '../../common/Input/Input';
import { diagnosConsts } from '../consts'
// import Switch from '../../common/Switch/Switch';
import Select from '../../common/Select/Select';
import RadioButton from '../../common/RadioButton/RadioButton';
import BodyAreaItem from '../BodyAreaItem/BodyAreaItem';
import {
  getBodyAreasWired,
  createTestWired,
  dispatchUserPayloadWired,
} from '../../../actions';
import {
  PAGE,
  pickKeys,
} from '../../../config';

class TestNew extends Component {
  componentWillMount() {
    getBodyAreasWired();
  }

  _prepareData = (data) => {
    let prepData = pick(data, pickKeys.testing);
    prepData.answers = pickBy(prepData, el => el.value);
    prepData.user_id = this.props.userReducer.user_id;
    prepData.type = 'diagnostic';
    return prepData;
  };

  _renderIncomingQuestions = () => {

  }

  render() {
    const {
      testingReducer,
      testingReducer: {
        bodyAreas,
        bodyAreasIds,
        q_age,
        q_sex,
      }
    } = this.props;
    return (
      <div>
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
                onClick={() => createTestWired(this._prepareData(testingReducer))}
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
              <p className="testing-inner-sub-header">
                Profile
              </p>
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
        {/*<Grid container spacing={0}>*/}
        {/*<Grid item xs={5}>*/}
        {/*<div className="testing-inner-container-long">*/}
        {/*<p className="testing-inner-sub-header">*/}
        {/*Conditions & Treatment*/}
        {/*</p>*/}


        {/*<RadioButton/>*/}
        {/*</div>*/}
        {/*</Grid>*/}

        {/*<Grid item xs={5}>*/}
        {/*<div className="testing-inner-container-long">*/}
        {/*<p className="testing-inner-sub-header">*/}
        {/*Questions*/}
        {/*</p>*/}
        {/*</div>*/}
        {/*</Grid>*/}
        {/*</Grid>*/}
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
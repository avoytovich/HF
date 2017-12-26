import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import omit from 'lodash/omit'
import Grid from 'material-ui/Grid';

// UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import Input from '../../common/Input/Input';
import { diagnosConsts } from '../consts'
// import Switch from '../../common/Switch/Switch';
import Select from '../../common/Select/Select';
import BodyAreaItem from '../BodyAreaItem/BodyAreaItem';
import {
  getBodyAreasWired,
} from '../../../actions';
import { PAGE } from '../../../config';

class TestNew extends Component {
  componentWillMount() {
    getBodyAreasWired();
  }

  _renderBodyAreasItem = (items = []) => {
    return items.map(({ title, id }) => {
      return (
        <BodyAreaItem
          key={id + title}
          reducer={this.props.testingReducer}
          title={title}
          id={id}
        />
      )
    })
  }

  render() {
    const {
      testingReducer,
      testingReducer: {
        bodyAreas,
        bodyAreasIds,
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
                onClick={() => {}}
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

          <Grid item xs={4}>
            <div className="testing-inner-container-long border-right">
              <p className="testing-inner-sub-header">
                Profile
              </p>
              <Select
                options={diagnosConsts.languages}
                id='q_lang'
                style={{ width: "100%" }}
                reducer={testingReducer}
                label='Language of questions'
              />
              <Select
                options={diagnosConsts.measurements}
                id='q_metric'
                style={{ width: "100%" }}
                reducer={testingReducer}
                label='Measurements'
              />
              <Select
                options={diagnosConsts.sex}
                id='sex'
                style={{ width: "100%" }}
                reducer={testingReducer}
                label='Sex'
              />

              <Grid container spacing={24}>

                <Grid item xs={6}>
                  <Input
                    type="number"
                    style={{ width: '100%'}}
                    id='q_age'
                    reducer={testingReducer}
                    label='Your age'
                  />
                </Grid>

                <Grid item xs={6}/>

                <Grid item xs={6}>
                  <Input
                    type="number"
                    style={{ width: '100%'}}
                    id='q_weight'
                    reducer={testingReducer}
                    label='Weight (kg)'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    type="number"
                    style={{ width: '100%'}}
                    id='q_height'
                    reducer={testingReducer}
                    label='Your height (cm)'
                  />
                </Grid>
              </Grid>

            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="testing-inner-container-long">
              <p className="testing-inner-sub-header">
                Body Areas
              </p>
              <Grid container spacing={24}>

                <Grid item xs={12}>
                  <Select
                    multiple
                    options={bodyAreas}
                    id='bodyAreasIds'
                    style={{ width: "100%" }}
                    reducer={testingReducer}
                    label='Body Areas'
                  />
                </Grid>
              </Grid>

              { this._renderBodyAreasItem(bodyAreasIds) }

            </div>
          </Grid>
        </Grid>
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
});

export default connect(mapStateToProps)(TestNew);
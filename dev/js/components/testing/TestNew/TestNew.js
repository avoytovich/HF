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
import { diagnosConsts } from './consts'
// import Switch from '../../common/Switch/Switch';
import Select from '../../common/Select/Select';
import {
  createAssetsPreValidate,
  T,
} from '../../../actions';
import { PAGE } from '../../../config';

class TestNew extends Component {
  _createAssets = (files = []) => {
    if (files.length) {
      files = files.map(file => {
        file.name_origin = file.name_real;
        return omit(file, ['progress'])
      });
      createAssetsPreValidate({ tmp_files: files })
        .then(res => res && this.props.toggleModal())
    }
  };

  render() {
    const {
      testingReducer,
      testingReducer: {

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

        <Grid container spacing={0}>
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
                id='language'
                style={{ width: "100%" }}
                name={T.TESTING}
                reducer={testingReducer}
                onChange={({ target: { value, id, name }, target }) => console.log(value, id, name, target)}
                label='Language of questions'
              />
              <Select
                options={diagnosConsts.measurements}
                id='measurement'
                style={{ width: "100%" }}
                name={T.TESTING}
                reducer={testingReducer}
                onChange={({ target: { value, id, name }, target }) => console.log(value, id, name, target)}
                label='Measurements'
              />
              <Select
                options={diagnosConsts.sex}
                id='sex'
                style={{ width: "100%" }}
                name={T.TESTING}
                reducer={testingReducer}
                onChange={({ target: { value, id, name }, target }) => console.log(value, id, name, target)}
                label='Sex'
              />

              <Grid container spacing={24}>

                <Grid item xs={6}>
                  <Input
                    style={{ width: '100%'}}
                    id='age'
                    reducer={testingReducer}
                    label='Your age'
                  />
                </Grid>

                <Grid item xs={6}/>

                <Grid item xs={6}>
                  <Input
                    style={{ width: '100%'}}
                    id='weight'
                    reducer={testingReducer}
                    label='Weight (kg)'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    style={{ width: '100%'}}
                    id='height'
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

                <Grid item xs={6}>
                  <Select
                    options={diagnosConsts.sex}
                    id='body_areas'
                    style={{ width: "100%" }}
                    name={T.TESTING}
                    reducer={testingReducer}
                    onChange={({ target: { value, id, name }, target }) => console.log(value, id, name, target)}
                    label='Sex'
                  />
                  <Input
                    select
                    currencies={[]}
                    style={{ width: '100%'}}
                    id='title'
                    reducer={testingReducer}
                    label='Body Areas'
                  />
                </Grid>

                <Grid item xs={6}>
                  <Input
                    type="range"
                    style={{ width: '100%'}}
                    id='title'
                    reducer={testingReducer}
                    label=' '
                  />
                </Grid>

                <Grid item xs={6}>
                  <Select
                    options={[]}
                    style={{ width: '100%'}}
                    id='title'
                    reducer={testingReducer}
                    label='Title'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    type="range"
                    style={{ width: '100%'}}
                    id='title'
                    reducer={testingReducer}
                    label=' '
                  />
                </Grid>
              </Grid>
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
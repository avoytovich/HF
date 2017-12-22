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
// import Switch from '../../common/Switch/Switch';
import {
  createAssetsPreValidate,
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

          <Grid item xs={5}>
            <div className="testing-inner-container border-right">
              <p className="testing-inner-sub-header">
                Profile
              </p>
            </div>
          </Grid>

          <Grid item xs={7}>

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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import omit from 'lodash/omit'

// UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Close from 'material-ui-icons/Close';

import {
  createAssetsPreValidate,
} from '../../../actions';
import { PAGE } from '../../../config';

class HeaderAssets extends Component {
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
      headerTitle,
      assetsReducer: {
        tmp_files,
      },
    } = this.props;
    return (
      <AppBar
        position="static"
        className="header-custom-black"
      >

        <Toolbar className="AppBar">
          <div className="upload-header-title-container">
            <Close
              className="upload-header-title-icon"
              onClick={() => this.props.toggleModal()}
            />
            <p className="upload-header-title">
              {headerTitle || 'Upload Files' }
            </p>
          </div>

          <div>
            <p
              className="upload-header-save-button"
              onClick={() => this._createAssets(tmp_files)}
            >
              SAVE
            </p>
          </div>

        </Toolbar>

      </AppBar>
    )
  }
}

HeaderAssets.propTypes = {
  toggleModal: PropTypes.func,
  headerTitle: PropTypes.string
};

const mapStateToProps = state => ({
  commonReducer: state.commonReducer,
  userReducer: state.userReducer,
  assetsReducer: state.assetsReducer,
});

export default connect(mapStateToProps)(HeaderAssets);
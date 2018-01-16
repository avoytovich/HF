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
  editAssetsPreValidate,
} from '../../../actions';
import { PAGE } from '../../../config';

class HeaderEditAssets extends Component {
  _editAssets = (files = []) => {
    if (files.length) {
      files = files.map(file => {
        file.link = file.link ||file.path ;
        file.name_origin = file.name ;
        file.name_real = file.name ;
        return omit(file, ['progress'])
      });
      editAssetsPreValidate(files[0], this.props.type)
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
              onClick={() => this._editAssets(tmp_files)}
            >
              SAVE
            </p>
          </div>

        </Toolbar>

      </AppBar>
    )
  }
}

HeaderEditAssets.propTypes = {
  toggleModal: PropTypes.func,
  headerTitle: PropTypes.string
};

const mapStateToProps = state => ({
  commonReducer: state.commonReducer,
  userReducer: state.userReducer,
  assetsReducer: state.assetsReducer,
});

export default connect(mapStateToProps)(HeaderEditAssets);
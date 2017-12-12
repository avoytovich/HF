import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import omit from 'lodash/omit'

// UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Close from 'material-ui-icons/Close';

import {
  logoutSimple,
  createAssetsWired,
} from '../../../actions';
import { PAGE } from '../../../config';

class HeaderAssets extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => this.setState({ anchorEl: event.currentTarget });
  handleRequestClose = () => this.setState({ anchorEl: null });

  _createAssets = (files = []) => {
    if (files.length) {
      files = files.map(file => {
        file.name_origin = file.name_real;
        return omit(file, ['progress'])
      });
      createAssetsWired({ tmp_files: files });
    }
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {
      userReducer: {
        name = '',
      },
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
              onClick={() => browserHistory.push(PAGE.assets)}
            />
            <p className="upload-header-title">
              Upload Files
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

const mapStateToProps = state => ({
  commonReducer: state.commonReducer,
  userReducer: state.userReducer,
  assetsReducer: state.assetsReducer,
});

export default connect(mapStateToProps)(HeaderAssets);
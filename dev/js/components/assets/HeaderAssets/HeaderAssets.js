import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

// UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Close from 'material-ui-icons/Close';

import {
  logoutSimple,
} from '../../../actions';
import { PAGE } from '../../../config';

class HeaderAssets extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => this.setState({ anchorEl: event.currentTarget });
  handleRequestClose = () => this.setState({ anchorEl: null });

  _signOut = () => {
    this.handleRequestClose();
    logoutSimple();
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {
      userReducer: {
        name = '',
      }
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
            <p className="upload-header-save-button">
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
});

export default connect(mapStateToProps)(HeaderAssets);
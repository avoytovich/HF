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
  _onSubmit = () => {
    console.log('om submit', this.props.createUsersReducers)

    this.props.toggleModal()
  };

  render() {
    const {
      headerTitle,
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
              {headerTitle || 'Title' }
            </p>
          </div>

          <div>
            <p
              className="upload-header-save-button"
              onClick={this._onSubmit}
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
  createUsersReducers: state.createUsersReducers,
});

export default connect(mapStateToProps)(HeaderAssets);
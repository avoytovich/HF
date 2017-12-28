import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { userCreate }     from '../../../actions';
// UI
import{ get } from 'lodash';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Close from 'material-ui-icons/Close';

class HeaderAssets extends Component {

  _onSubmit = () => {
    console.log('om submit', this.props.createUsersReducers)
    const result = {...this.props.createUsersReducers, ...{type: this.props.userInfo.userType,
      tariff_id: this.props.userInfo.tarrifId, entryFee: 100,
      email: get(this.props.createUsersReducers,'contact_info.contacts[0].email')}};
    delete result.errors;
    console.log(result);
    userCreate('users', 'customers', result)
      .then(() => this.props.toggleModal())
      browserHistory.push(this.props.backButton)
  };

  render() {
    const headerTitle = this.props.userInfo.headerTitle;
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
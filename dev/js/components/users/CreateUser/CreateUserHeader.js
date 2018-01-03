import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { userCreate, userUpdate }     from '../../../actions';
// UI
import{ get } from 'lodash';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Close from 'material-ui-icons/Close';

class HeaderAssets extends Component {

  _onSubmit = () => {
    console.log('om submit', this.props);
    let userType,tariff_id;
    if(get(this.props,'profileReducer.type')==='clinic'){
       userType = 'clinic';
       tariff_id = 2
    }
    else{
       userType = 'organization';
       tariff_id = 3
    }
    const result = {...this.props.createUsersReducers, ...{type: userType,
      tariff_id: tariff_id, entryFee: 100,
      email: get(this.props.createUsersReducers,'contact_info.contacts[0].email')}};

    if(this.props.userInfo.actionType ==='create'){
      userCreate('users', 'customers', result)
        .then(() => this.props.toggleModal())
      browserHistory.push(this.props.backButton)
    }
    else if (this.props.userInfo.actionType ==='edit'){
      userUpdate('users', 'customers', this.props.userData.id,  result)
        .then(() => this.props.toggleModal())
    }
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
              {headerTitle || 'Edit ' + (get(this.props,'profileReducer.type')==='clinic'?'Clinic ':'Company ') }
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
  profileReducer: state.profileReducer,
});

export default connect(mapStateToProps)(HeaderAssets);
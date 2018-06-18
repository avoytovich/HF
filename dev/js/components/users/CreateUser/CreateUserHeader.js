import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { userCreate, userUpdate, submitUserFields }     from '../../../actions';

// UI
import{ get } from 'lodash';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Close from 'material-ui-icons/Close';

class HeaderAssets extends Component {

  componentDidMount() {
    const { userInfo } = this.props;
    if (userInfo) {
      const { headerTitle } = userInfo;
      this.props.defineTitle(headerTitle);
    }
  }

  _onSubmit = (createUsersReducers) => {
    const {
      errors,
      email
    } = createUsersReducers;

    const validValues = {email};

    let userType;
    if (this.props.userInfo){
      userType = this.props.userInfo.userType;
    }
    else if(get(this.props,'profileReducer.type')==='clinic'){
       userType = 'clinic';
    }
    else{
       userType = 'organization';
    }

    const result = {...createUsersReducers, ...{type: userType, entryFee: 100}};
    
    const {isValid} = submitUserFields(validValues, errors, result);
    if(!isValid) return;

    if(get(this.props,'userInfo.actionType') ==='create'){
      userCreate('users', 'customers', result)
        .then(() => {
        this.props.toggleModal();
        browserHistory.push(get(this.props,'backButton'))
      })
    }
    else {
      userUpdate('users', 'customers', this.props.userData.id,  result)
        .then(() => {
          this.props.toggleModal();
          browserHistory.push(get(this.props,'backButton'))
        })
    }
  };

  render() {
    const headerTitle = get(this.props,'userInfo.headerTitle');
    const {
      createUsersReducers
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
              {headerTitle || 'Edit ' + (get(this.props,'profileReducer.type')==='clinic'?'Clinic ':'Company ') }
            </p>
          </div>

          <div>
            <p
              className="upload-header-save-button"
              onClick={()=> {this._onSubmit(createUsersReducers)}}
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
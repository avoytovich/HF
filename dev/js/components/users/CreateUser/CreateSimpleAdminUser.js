import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const userTypeArray = [
  {label:'Simple User',value:'regular'},
  {label:'Admin',value:'admin'}];

class CreateSimpleUser extends Component {

  render() {
    const {createSimpleUsersReducers} = this.props;
    return (
      <div className="create-simple-admin-users-content">
        <Input id='first_name' reducer={createSimpleUsersReducers} label='First Name' placeholder='First Name'/>
        <Input id='last_name' reducer={createSimpleUsersReducers} label='Last Name' placeholder='Last Name'/>
        <Input id='email' reducer={createSimpleUsersReducers} label='Email' placeholder='Email'/>
        <Select
          options={userTypeArray}
          id='role'
          reducer={createSimpleUsersReducers}
          label='User type'
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createSimpleUsersReducers: state.createSimpleUsersReducers
});

export default connect(mapStateToProps)(CreateSimpleUser);

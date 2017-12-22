import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';

class CreateUser extends Component {

  render() {
    const {createUsersReducers} = this.props;
    console.log(this.props)
    return (
      <div>
        <Input id="email" reducer={createUsersReducers} placeholder='Enter email'/>
        <Input id="name" reducer={createUsersReducers} placeholder='name'/>
        <Input id="entryFee" reducer={createUsersReducers} placeholder='entryFee'/>
        <Input id="tariff_id" reducer={createUsersReducers} placeholder='tariff_id'/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userReducer: state.userReducer,
  createUsersReducers: state.createUsersReducers
});

export default connect(mapStateToProps)(CreateUser);

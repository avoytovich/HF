import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';

class CreateUser extends Component {

  render() {
    const {constr} = this.props;
    console.log(this.props)
    return (
      <div>
        <Input id="emailclddr" type="text" reducer={{typepe:'ghd'}} placeholder='Enter email'/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userReducer: state.userReducer,
  createUsersReducers: state.createUsersReducers
});

export default connect(mapStateToProps)(CreateUser);

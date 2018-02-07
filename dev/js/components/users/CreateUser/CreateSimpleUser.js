import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';

class CreateSimpleUser extends Component {

  render() {
    const {createSimpleUsersReducers} = this.props;
    return (
      <div>
        <Input id='email' reducer={createSimpleUsersReducers} label='Email' placeholder='Email'/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createSimpleUsersReducers: state.createSimpleUsersReducers
});

export default connect(mapStateToProps)(CreateSimpleUser);

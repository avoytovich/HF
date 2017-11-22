import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Container from '../Container/Container';
import Input from '../../common/Input/Input';

class SignUp extends Component {
  render() {
    const {
      authReducer,
      authReducer: { email },
    } = this.props;
    return (
      <Container>
          <div className="sign-up-form-container">
            <div className="sign-up-form-wrapper">
              <div className="sign-up-title-wrapper">
                <p className="sign-up-title">
                  Sign Up
                </p>
              </div>

              <div className="sign-up-input-wrapper">
                <Input
                  id='email'
                  value={email}
                  reducer={authReducer}
                  label='Email'
                  placeholder='example@gmail.com'
                />
              </div>

              <div className="sign-up-button-wrapper">
                <Button
                  raised
                  color="default"
                >
                  Sign Up
                </Button>
              </div>

            </div>
          </div>
      </Container>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

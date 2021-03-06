import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Container from '../Container/Container';
import Input from '../../common/Input/Input';
import { PAGE } from '../../../config';
import { sendEmailForgetPassWired } from '../../../actions';

class ForgotPassword extends Component {
  render() {
    const {
      authReducer,
      authReducer: { email },
    } = this.props;
    return (
      <Container>
        <div className="sign-up-form-container">
          <div className="sign-up-form-wrapper">
            <div className="sing-up-title-wrapper">
              <p className="login-title">
                Forgot Password?
              </p>
              <p className="login-sub-title">
                Please enter your email
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
                onClick={() => sendEmailForgetPassWired({ email })}
                raised
                className="button-custom-black"
              >
                Send Password
              </Button>
            </div>

            <div className="sign-up-to-login-wrapper">
              <p
                onClick={() => browserHistory.push(PAGE.login)}
                className="sign-up-to-login"
              >
                Log In
              </p>
            </div>

          </div>
        </div>
      </Container>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

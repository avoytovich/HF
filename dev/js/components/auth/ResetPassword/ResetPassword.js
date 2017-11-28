import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Container from '../Container/Container';
import Input from '../../common/Input/Input';
import { page } from '../../../config';
import { resetPasswordWired } from '../../../actions';

class ResetPassword extends Component {
  render() {
    const {
      authReducer,
      authReducer: {
        password,
        confirmPassword,
      },
      location: {
        query: {
          token,
          user_id,
        }
      }
    } = this.props;
    console.log(token, user_id);
    return (
      <Container>
        <div className="sign-up-form-container">
          <div className="sign-up-form-wrapper">
            <div className="sing-up-title-wrapper">
              <p className="login-title">
                Create New Password
              </p>
              <p className="login-sub-title">
                Enter minimum 6-digit password
              </p>
            </div>

            <div className="sign-up-input-wrapper">
              <Input
                id='password'
                type="password"
                value={password}
                reducer={authReducer}
                label='Password'
              />

              <Input
                id='confirmPassword'
                type="password"
                value={confirmPassword}
                reducer={authReducer}
                label='Repeat Password'
              />
            </div>

            <div className="sign-up-button-wrapper">
              <Button
                raised
                className="button-custom-black"
                onClick={() => resetPasswordWired({
                  password,
                  user_id,
                  token,
                })}
              >
                Done
              </Button>
            </div>

            <div className="sign-up-to-login-wrapper">
              <p
                onClick={() => browserHistory.push(page.login)}
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

ResetPassword.propTypes = {
  authReducer: PropTypes.object,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import Container from '../Container/Container';
import Input from '../../common/Input/Input';
import { C } from '../../../components';

import { PAGE } from '../../../config';

import {
  loginWired,
  dispatchAuthPayloadWired,
  twoFactorConfirmWired,
} from '../../../actions'

class Login extends Component {
  _toggleTwoFactorModal = () => {
    const showTwoFactorModal = this.props.authReducer.showTwoFactorModal;
    dispatchAuthPayloadWired({ showTwoFactorModal: !showTwoFactorModal })
  };

  _loginAndGetUserInfo = (data) => loginWired(data);

  _twoFactorAuth = (data) => {
    twoFactorConfirmWired(data);
  }

  render() {
    const {
      authReducer,
      authReducer: {
        email,
        password,
        showTwoFactorModal,
        twoFactorCode,
      },
      commonReducer: {
        currentLanguage: { L_LOGIN },
      },
    } = this.props;
    console.log(twoFactorCode);

    return (
      <Container >
        <div className="login-form-container">
          <div className="login-form-wrapper">

            <div className="login-title-wrapper">
              <p className="login-title">
                { L_LOGIN.title }
              </p>
              <p className="login-sub-title">
                { L_LOGIN.subTitle }
              </p>
            </div>

            <div className="login-input-wrapper">
              <Input
                id='email'
                reducer={authReducer}
                label={ L_LOGIN.email.label }
                placeholder={ L_LOGIN.email.placeholder }
              />
              <Input
                id='password'
                type="password"
                reducer={authReducer}
                label={ L_LOGIN.password.placeholder }
              />
            </div>

            <div className="login-button-wrapper">
              <Button
                onClick={() => this._loginAndGetUserInfo({ email, password })}
                raised
                className="button-custom-black"
              >
                { L_LOGIN.loginButton }
              </Button>
            </div>

            <div className="sign-up-to-login-wrapper">
              <p
                onClick={() => browserHistory.push(PAGE.passForgot)}
                className="sign-up-to-login"
              >
                Forgot Password
              </p>
            </div>

          </div>
        </div>

        <C.Modal
          itemName="title"
          open={showTwoFactorModal}
          title='Two-factor authorization.'
          CustomContent={() => <C.TwoFactorInput />}
          toggleModal={this._toggleTwoFactorModal}
          onConfirmClick={() => this._twoFactorAuth({ email, code: twoFactorCode })}
        />

      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  commonReducer: state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

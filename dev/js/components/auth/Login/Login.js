import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import Container from '../Container/Container';
import Input from '../../common/Input/Input';
import CheckBox from '../../common/CheckBox/CheckBox';

import { loginWired } from '../../../actions'

class Login extends Component {
  render() {
    const {
      authReducer,
      authReducer: {
        email,
        password,
        remember_me,
      },
      commonReducer: {
        currentLanguage: { L_LOGIN },
      },
    } = this.props;
    return (
      <Container>
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
                value={email}
                reducer={authReducer}
                label={ L_LOGIN.email.label }
                placeholder={ L_LOGIN.email.placeholder }
              />
              <Input
                id='password'
                type="password"
                value={password}
                reducer={authReducer}
                label={ L_LOGIN.password.placeholder }
              />
            </div>

            {/*<div>*/}
              {/*<CheckBox*/}
                {/*id='remember_me'*/}
                {/*value={remember_me}*/}
                {/*reducer={authReducer}*/}
                {/*label="dfsdfsdfsdf"*/}
                {/*checked={true}*/}
                {/*onChange={(val => console.log(val))}*/}
              {/*/>*/}
            {/*</div>*/}

            <div className="login-button-wrapper">
              <Button
                onClick={() => loginWired({ email, password })}
                raised
                className="button-custom-black"
              >
                { L_LOGIN.loginButton }
              </Button>
            </div>

          </div>
        </div>
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

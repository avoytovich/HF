import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import Container from '../Container/Container';
import Input from '../../common/Input/Input';
import CheckBox from '../../common/CheckBox/CheckBox';

import { login } from '../../../actions'

class Login extends Component {
  render() {
    const {
      authReducer,
      authReducer: {
        email,
        password,
      },
    } = this.props;
    return (
      <Container>
        <div className="login-form-container">
          <div className="login-form-wrapper">

            <div className="login-title-wrapper">
              <p className="login-title">
                Log In
              </p>
              <p className="login-sub-title">
                Please enter your email and password
              </p>
            </div>

            <div className="login-input-wrapper">
              <Input
                id='email'
                value={email}
                reducer={authReducer}
                label='Email'
                placeholder='example@mail.com'
              />
              <Input
                id='password'
                type="password"
                value={password}
                reducer={authReducer}
                label='Password'
                placeholder='example@mail.com'
              />
            </div>

            <div>
              <CheckBox
                reducer={authReducer}
                label="dfsdfsdfsdf"
                checked={true}
                onChange={(val => console.log(val))}
                red
              />
            </div>

            <div className="login-button-wrapper">
              <Button
                onClick={() => login({ email, password })}
                raised
                color="default"
              >
                Login
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

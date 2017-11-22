import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Container from '../Container/Container';
import Input from '../../common/Input/Input';

class ForgotPassword extends Component {
  render() {
    const {
      signupReducer,
      signupReducer: { email },
    } = this.props;
    return (
      <Container>
        <div className="sign-up-form-container">
          <div className="sign-up-form-wrapper">
            <div className="sing-up-title-wrapper">
              <p className="sing-up-title">
                Sign Up
              </p>
            </div>

            <div className="sign-up-input-wrapper">
              <Input
                id='email'
                value={email}
                reducer={signupReducer}
                label='Email'
                placeholder='example@gmail.com'
              />
            </div>

            <div className="sign-up-button-wrapper">
              <Button
                raised
                color="default"
              >
                Primary
              </Button>
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
  login: state.signupReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

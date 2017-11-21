import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';


import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Input from '../../common/Input/Input';
import { SIGN_UP } from '../../../actions';

class SignUp extends Component {
  render() {
    const {
      signupReducer: { email },
    } = this.props;
    return (
      <Container>
        <Grid item xs={12} sm={6} hidden={{ smDown: true }}>
          <Logo />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="sign-up-form-container">
            <div className="sign-up-form-wrapper">
              <div className="sing-up-title-wrapper">
                <p className="sing-up-title">
                  Sign Up
                </p>
              </div>

              <Input
                id='email'
                name={SIGN_UP}
                value={email}
                label='Email'
                placeholder='example@gmail.com'
              />

            </div>
          </div>

        </Grid>
      </Container>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  signupReducer: state.signupReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

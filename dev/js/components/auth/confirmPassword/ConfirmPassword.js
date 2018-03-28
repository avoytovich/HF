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
import { resetPasswordWired, getPassToken } from '../../../actions';

class ConfirmPassword extends Component {

  state = { token: null };

  componentWillMount() {
    const { code, user_id } = this.props.location.query;
    if (code && user_id) {
      getPassToken(code, user_id).then(res => {
        const {token} = res;
        this.setState({token});
      });
    }
  }

  render() {
    const {
      authReducer,
      authReducer: {
        password,
        confirmPassword,
      },
      location: {
        query: {
          user_id,
        }
      }
    } = this.props;

    const { token } = this.state;

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
                disabled={!!token}
                label='Password'
              />

              <Input
                id='confirmPassword'
                type="password"
                value={confirmPassword}
                reducer={authReducer}
                disabled={!!token}
                label='Repeat Password'
              />
            </div>

            <div className="sign-up-button-wrapper">
              <Button
                raised
                disabled={!!token}
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
          </div>
        </div>
      </Container>
    );
  }
}

ConfirmPassword.propTypes = {
  authReducer: PropTypes.object,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);

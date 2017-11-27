import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import { assets } from '../../../config/apiRoutes';

const styles = theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class SignUp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        className="auth-logo-container"
        style={{ backgroundImage: `url(${assets}/images/auth/page-1@3x.png)`}}
      >
        <img src={`${assets}/images/auth/logo.png`} alt="logo"/>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
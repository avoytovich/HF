import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import Container from '../Container/Container';
import Logo from '../Logo/Logo';

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
      <Container>
        <Grid item xs={12} sm={6} hidden={{ smDown: true }}>
          <Logo />
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>Not logo</Paper>
        </Grid>
      </Container>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
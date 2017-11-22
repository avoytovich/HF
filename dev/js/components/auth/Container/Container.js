import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Logo from '../Logo/Logo';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Container extends Component {
  render() {
    const { classes, spacing } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={spacing || 0}>
          <Grid item xs={12} sm={6} hidden={{ smDown: true }}>
            <Logo />
          </Grid>

          <Grid item xs={12} sm={6}>
            {this.props.children}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(styles)(Container);
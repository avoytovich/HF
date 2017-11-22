import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

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
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

export default withStyles(styles)(Container);
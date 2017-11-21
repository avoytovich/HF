import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Input extends Component {

  render() {
    const { classes, ...props } = this.props;
    return (
      <TextField
        label="With placeholder"
        placeholder="Placeholder"
        className={classes.textField}
        margin="normal"
        {...props}
      />
    );
  }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Input);
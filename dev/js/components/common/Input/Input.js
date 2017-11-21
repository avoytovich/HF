import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import { onChange } from '../../../actions'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

class Input extends Component {
  render() {
    const {
      id,
      name,
      value,
      classes,
      onCustomChange,
      label = '',
      placeholder = '',
      ...props,
    } = this.props;
    return (
      <TextField
        id={id}
        name={name}
        value={value}
        onChange={onCustomChange || onChange}
        label={label}
        placeholder={placeholder}
        className={classes.textField}
        margin="normal"
        {...props}
      />
    );
  }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onCustomChange: PropTypes.func,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Input));

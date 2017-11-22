import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';
import omit from 'lodash/omit';

import { onChange } from '../../../actions'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: 300,
  },
});

class Input extends Component {
  render() {
    const {
      id,
      value,
      classes,
      onChange,
      onCustomChange,
      label = '',
      placeholder = '',
      reducer: {
        actionType,
        errors,
      },
      ...props,
    } = this.props;
    const error = errors[id];
    return (
    <FormControl className={classes.formControl} error={!!error}>
      <TextField
        error={!!error}
        id={id}
        name={actionType}
        value={value}
        onChange={onCustomChange || onChange}
        label={label}
        placeholder={placeholder}
        className={classes.textField}
        margin="normal"
        {...omit(props, ['dispatch'])}
      />
      {
        error &&
        <FormHelperText>{ error }</FormHelperText>
      }
    </FormControl>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  reducer: PropTypes.object.isRequired,
  classes: PropTypes.object,
  onChange: PropTypes.func,
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

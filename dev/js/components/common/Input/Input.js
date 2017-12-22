import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';
import omit from 'lodash/omit';
import get from 'lodash/get';

import { onChange } from '../../../actions'

const styles = theme => ({
  formControl: {
    width: '100%',
  },
  textField: {
    width: 300,
  },
});

class Input extends Component {
  render() {
    const {
      id,
      classes,
      onChange,
      onCustomChange,
      label = '',
      placeholder = '',
      reducer,
      select,
      style,
      currencies,
      reducer: {
        actionType,
        errors,
      },
      ...props,
    } = this.props;
    const value = get(reducer, id, '');
    const error = get(errors, id, false);
    return (
    <FormControl className={classes.formControl} error={!!error}>
      {select ?
        <TextField
          select
          error={!!error}
          id={id}
          name={actionType}
          value={value}
          onChange={onCustomChange || onChange}
          label={label}
          placeholder={placeholder}
          className={classes.textField}
          style={style}
          margin="normal"
          SelectProps={{
            native: true,
          }}
          {...omit(props, ['dispatch'])}
        >
          {
            currencies.map((option, index) => (
              <option
                key={index}
                selected={option.value === value}
                value={option.value}
              >
                {option.label}
              </option>
            ))
          }
        </TextField>
        :
        <TextField
          error={!!error}
          id={id}
          name={actionType}
          value={value}
          onChange={onCustomChange || onChange}
          label={label}
          placeholder={placeholder}
          className={classes.textField}
          style={style}
          margin="normal"
          {...omit(props, ['dispatch'])}
        />
      }
      {
        error && <FormHelperText>{ error }</FormHelperText>
      }
    </FormControl>
    );
  }
}

Input.defaultProps = {
  styles: {},
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  reducer: PropTypes.object.isRequired,
  classes: PropTypes.object,
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onCustomChange: PropTypes.func,
  style: PropTypes.object,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Input));

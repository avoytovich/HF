import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import omit from 'lodash/omit';
import get from 'lodash/get';

import { onChange } from '../../../actions'

const styles = theme => ({
  formControl: {
    width: "100%",
    marginTop: 16,
    marginBottom: 32,
  },
  textField: {
    width: 300,
  },
});

class SimpleSelect extends React.Component {
  _renderOptions = (options) => {
    return options.map((op, i) => {
      return (
        <MenuItem
          key={i}
          style={this.props.style}
          value={op.value}
        >
          {op.label}
        </MenuItem>
      )
    })
  }

  render() {
    const {
      reducer,
      reducer: {
        errors,
        actionType,
      },
      options = [],
      id,
      onChange,
      classes,
      style = {},
      onChangeCustom,
      label,
      ...props
    } = this.props;
    const value         = get(reducer, id, '');
    const error         = get(errors, id, false);
    const onChangeFinal = onChangeCustom || onChange;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          value={value}
          name={actionType}
          onChange={({ target: { value, }}) => onChangeFinal({ target: { name: actionType, value, id }})}
          input={<Input style={[classes.textField, style]} id={id} />}
          {...omit(props, ['dispatch', 'onChange'])}
        >
          {this._renderOptions(options)}
        </Select>
        {
          error && <FormHelperText>{ error }</FormHelperText>
        }
      </FormControl>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleSelect));
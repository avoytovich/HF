import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  formControl: {
    width: "100%",
  },
  textField: {
    width: 300,
  },
});

class SimpleSelect extends React.Component {
  _renderOptions = (options, i) => {
    return options.map(op => {
      return <MenuItem style={this.props.style} key={i} value={op.value}>{op.label}</MenuItem>
    })
  }

  render() {
    const {
      options = [],
      value = '',
      name = '',
      id = '',
      onChange = (e) => console.log(e),
      classes,
      style = {},
      label
    } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          value={value}
          name={name}
          id={id}
          onChange={onChange}
          input={<Input style={[classes.textField, style]} name={name} id={id}/>}
        >
          {this._renderOptions(options)}
        </Select>
      </FormControl>
    )
  }
};

export default withStyles(styles)(SimpleSelect);
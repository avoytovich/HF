import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import SwitchComponent from 'material-ui/Switch';

class Switch extends React.Component {
  render() {
    const {
      label,
      checked,
      onChange,
      labelClassName
    } = this.props;
    return (
      <FormGroup>
        <FormControlLabel
          label={label}
          className={labelClassName}
          control={
            <SwitchComponent
              checked={checked}
              onChange={(event, checked) => onChange(event, checked)}
            />
          }
        />
      </FormGroup>
    );
  }
}

Switch.defaultProps = {
  label: 'Label',
  checked: false,
  onChange: (e, checked) => console.log(e, checked),
  labelClassName: '',
};

Switch.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  labelClassName: PropTypes.string,
};

export default Switch;
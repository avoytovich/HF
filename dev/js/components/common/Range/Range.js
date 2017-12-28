import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import omit from 'lodash/omit';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import { onChange } from '../../../actions'
import Input from '../../common/Input/Input'

class Range extends Component {
  _renderRangees = items => {
    return items.map(({ label, value }, i) => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={false}
              onChange={() => {
              }}
              value="gilad"
            />
          }
          label={label}
        />
      )
    });
  };

  render() {
    const {
      classes,
      items = [],
      reducer,
      reducer: {
        errors,
        actionType,
      },
      id,
      onChange,
      style = {},
      onChangeCustom,
      label = 'Label',
      range = { max: 100, min: 0 },
      ...props
    } = this.props;

    const value = get(reducer, id, '');
    const error = get(errors, id, false);
    const onChangeFinal = onChangeCustom || onChange;

    return (
      <div className="margin-range">
        <FormControl component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>
          <Input
            type="range"
            style={{ width: '100%' }}
            underline="none"
            id={`vas_pain_level_area_${id}`}
            reducer={reducer}
            label={label}
            placeholder=" "
            max={range.max}
            min={range.min}
          />
        </FormControl>
      </div>
    );
  }
}

Range.propTypes = {
  id: PropTypes.string.isRequired,
  reducer: PropTypes.object.isRequired,
  value: PropTypes.bool,
  classes: PropTypes.object,
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onCustomChange: PropTypes.func,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Range);

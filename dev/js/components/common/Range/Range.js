import React, { Component } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import {
  FormLabel,
  FormControl,
} from 'material-ui/Form';

import {
  dispatchTestingPayloadWired,
} from '../../../actions'
import Input from '../../common/Input/Input'

class Range extends Component {
  render() {
    const {
      reducer,
      id,
      label = 'Label',
      range: {
        max,
        min,
      },
    } = this.props;
    const value = get(reducer, `${id}.value`, 0);
    return (
      <div className="margin-range">
        <FormControl component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>
          <div className="range-input-wrapper">
            <Input
              type="range"
              onCustomChange={({ target: { value }}) => {
                const valueWithinRange = Math.ceil((value / 100) * (+max - +min)) + +min;
                dispatchTestingPayloadWired({
                  [`${id}.type`]       : 'single',
                  [`${id}.value`]      : valueWithinRange,
                  [`${id}.valueOrigin`]: value,
                })
              }}
              style={{ width: '100%' }}
              id={`${id}.valueOrigin`}
              reducer={reducer}
            />
            <span className="range-input-value-indicator"> { value } </span>
          </div>
        </FormControl>
      </div>
    );
  }
}

Range.propTypes = {
  id: PropTypes.string.isRequired,
  reducer: PropTypes.object.isRequired,
  label: PropTypes.string,
};

export default Range;

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import {
  FormLabel,
  FormControl,
} from 'material-ui/Form';

import Input from '../../common/Input/Input'

class Range extends Component {
  render() {
    const {
      reducer,
      id,
      label,
      range,
      onChangeCustom,
    } = this.props;
    const value = get(reducer, id, 0);
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <div className="range-input-wrapper">
          <Input
            type="range"
            style={{ width: '100%' }}
            id={id}
            onChangeCustom={onChangeCustom}
            reducer={reducer}
            {...range}
          />
          <span className="range-input-value-indicator"> { value } </span>
        </div>
      </FormControl>
    );
  }
}

Range.propTypes = {
  id: PropTypes.string.isRequired,
  reducer: PropTypes.object.isRequired,
  label: PropTypes.string,
  onChangeCustom: PropTypes.func,
};

Range.defaultProps = {
  range: { min: 0, max: 100 },
  label: 'Label',
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Range);

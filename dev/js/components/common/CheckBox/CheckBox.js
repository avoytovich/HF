import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import {
  onChange,
  dispatchTestingPayloadWired,
  dispatchDeleteMultOptionWired,
  dispatchAddMultOptionWired,
} from '../../../actions';

class CheckBox extends Component {
  _onChange = (id, answerId, i) => (event, checked) => {
    if (checked) {
      dispatchTestingPayloadWired({ [`${id}.type`]: 'multiple' });
      dispatchAddMultOptionWired(`${id}.value`, answerId);
    } else {
      dispatchDeleteMultOptionWired(`${id}.value`, answerId)
    }
  };

  _renderCheckBoxes = items => {
    return items.map(({ label, answerId }, i) => {
      const {
        reducer,
        id,
        onChangeCustom,
      }                   = this.props;
      const value         = get(reducer, `${id}.value[${i}]`);
      const onChangeFinal = onChangeCustom || this._onChange;
      return (
        <FormControlLabel
          key={i}
          control={
            <Checkbox
              checked={value}
              onChange={onChangeFinal(id, answerId, i)}
            />
          }
          label={label}
        />
      )
    });
  };

  render() {
    const {
      items = [],
    } = this.props;

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          { this._renderCheckBoxes(items)}
        </FormGroup>
      </FormControl>
    );
  }
}

CheckBox.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);

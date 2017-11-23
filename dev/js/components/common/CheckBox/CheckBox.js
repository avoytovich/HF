import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import omit from 'lodash/omit';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

import { onChange } from '../../../actions'

class CheckBox extends Component {
  render() {
    const {
      id,
      value,
      checked,
      onChange,
      onCustomChange,
      label = '',
      reducer: {
        actionType,
        errors,
      },
      ...props,
    } = this.props;
    // const error = errors[id];
    return (
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            checked={value}
            onChange={onCustomChange || onChange}
            {...omit(props, ['dispatch'])}
          />
        }
        label={label}
      />
    );
  }
}

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);

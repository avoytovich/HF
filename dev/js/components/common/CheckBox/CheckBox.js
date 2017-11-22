import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import omit from 'lodash/omit';
import Checkbox from 'material-ui/Checkbox';
import {
  FormControlLabel,
} from 'material-ui/Form';

import { onChange } from '../../../actions'

const styles = theme => ({
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
      checked,
      onChange,
      onCustomChange,
      label = '',
      // reducer: {
      //   actionType,
      //   errors,
      // },
      ...props,
    } = this.props;
    // const error = errors[id];
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onCustomChange || onChange}
            value="gilad"
          />
        }
        label={label}
      />
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

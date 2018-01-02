import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';

import { onChange } from '../../../actions';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    marginLeft: 0,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {
  _renderItems = (items) => {
    return items.map(({ label, value }, i) => {
      return (
        <FormControlLabel
          key={i}
          value={value}
          label={label}
          control={<Radio />}
        />
      )
    })
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
      ...props
    } = this.props;

    const value         = get(reducer, id, '');
    const error         = get(errors, id, false);
    const onChangeFinal = onChangeCustom || onChange;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" required className={classes.formControl}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            aria-label="gender"
            className={classes.group}
            value={value}
            name={actionType}
            onChange={(e, value) => onChangeFinal({ target: { name: actionType, value, id }})}
            {...omit(props, ['dispatch', 'onChange'])}
          >
            { this._renderItems(items)}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array,
  reducer: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RadioButtonsGroup));

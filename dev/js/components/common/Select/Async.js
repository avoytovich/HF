import React, { Component }             from 'react';
import { connect }                      from 'react-redux';
import { bindActionCreators }           from 'redux';
import find                             from 'lodash/find';
import get                              from 'lodash/get';
import PropTypes                        from 'prop-types';
import Select                           from 'material-ui/Select';
import Checkbox                         from 'material-ui/Checkbox';
import { InputLabel }                   from 'material-ui/Input';
import { MenuItem }                     from 'material-ui/Menu';
import { FormControl, FormHelperText }  from 'material-ui/Form';
import { withStyles }                   from 'material-ui/styles';

import { onChange } from '../../../actions'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%',
    marginTop: 16,
    marginBottom: 32,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
};

class AsyncSelect extends Component {
  state = { options: [] };

  componentDidMount() {
    const { loadOptions } = this.props;
    loadOptions().then(options => this.setState({ options }));
  }

  renderValue = selected => selected
    .map(id => get(find(this.state.options, { id }), 'label'))
    .join(', ');

  render() {
    const {
      reducer,
      reducer: {
        errors,
        actionType,
      },
      id,
      label,
      classes,
      onChangeCustom,
      onChange,
    } = this.props;

    const { options } = this.state;

    const value         = get(reducer, id, '') || [];
    const error         = get(errors, id, false);
    const onChangeFinal = onChangeCustom || onChange;

    return <FormControl className={classes.formControl}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        multiple
        value={value}
        name={actionType}
        className="async-area-select"
        disabled={!options.length}
        MenuProps={MenuProps}
        renderValue={this.renderValue}
        onChange={({ target: { value }}) => onChangeFinal({ target: { name: actionType, value, id }})}
        style={{ width: '100%' }}
      >
        {options.map(item => (
          <MenuItem
            key={item.value + ''}
            value={item.value}
          >
            <Checkbox checked={value.indexOf(item.value) > -1} />
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {
        error && <FormHelperText>{ error }</FormHelperText>
      }
    </FormControl>
  }
}

AsyncSelect.defaultProps = {
  placeholder : 'Select body area',
  className   : 'async_area_select',
  label       : 'Pain Areas',
  domain      : 'diagnostics',
  labelClass  : ''
};

AsyncSelect.propTypes = {
  path        : PropTypes.string.isRequired,
  domain      : PropTypes.string.isRequired,
  valuePath   : PropTypes.string.isRequired,
  idKey       : PropTypes.string.isRequired,
  placeholder : PropTypes.string,
  className   : PropTypes.string,
  label       : PropTypes.string,
  labelClass  : PropTypes.string
};

const mapDispatchToProps = dispatch => bindActionCreators({ dispatch, onChange }, dispatch);

export default connect(null, mapDispatchToProps)(withStyles(styles)(AsyncSelect));
import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import PropTypes                    from 'prop-types';
import Typography                   from 'material-ui/Typography';
import { Async }                    from 'react-select';
import Select                       from 'material-ui/Select';
import { MenuItem }                 from 'material-ui/Menu';
import { withStyles }               from 'material-ui/styles';
import { FormControl }              from 'material-ui/Form';
import Input, { InputLabel }        from 'material-ui/Input';

import {
  findArea,
  updateCrateQuestionFields
}                                   from '../../../actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '5px'
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


class AsyncAreaSelect extends Component{
  componentDidMount() {
    const { domain, path } = this.props;
    findArea(domain, path).then(res => {
      const { data } = res.data;
      const _data = data.map(item => Object.assign({}, item, { label: item.title, value: item.id }));
      updateCrateQuestionFields(_data, 'areas');
    });
  }

  render() {
    const {
      valuePath, placeholder, className, label, labelClass, store, classes,
      store: { areas }
    } = this.props;

    const areaIds = store[valuePath];

    return<div className={classes.container}>
      <div className={classes.formControl}>
        <Typography
          type="caption"
          gutterBottom
          className={`custom-select-title ${labelClass}`}>
          { label }
        </Typography>
        <Select
          multiple
          value={areaIds}
          className="async-area-select"
          placeholder={ placeholder }
          disabled={ !areas.length }
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 200,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
          },
            },
          }}
          onChange={event => updateCrateQuestionFields(event.target.value, valuePath)}>
          {areas.map(item => (
            <MenuItem
              key={item.id} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  }
}

AsyncAreaSelect.defaultProps = {
  placeholder : 'Select body area',
  className   : 'async_area_select',
  label       : 'Body Areas',
  labelClass  : ''
};

AsyncAreaSelect.propTypes = {
  path        : PropTypes.string.isRequired,
  domain      : PropTypes.string.isRequired,
  valuePath   : PropTypes.string.isRequired,
  idKey       : PropTypes.string.isRequired,
  placeholder : PropTypes.string,
  className   : PropTypes.string,
  label       : PropTypes.string,
  labelClass  : PropTypes.string
};

const mapStateToProps    = state => ({store: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AsyncAreaSelect));
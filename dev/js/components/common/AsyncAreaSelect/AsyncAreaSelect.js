import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import PropTypes                    from 'prop-types';
import Typography                   from 'material-ui/Typography';
import { Async }                    from 'react-select';
import {
  findArea,
  updateCrateQuestionFields
}                                   from '../../../actions';

class AsyncAreaSelect extends Component{
  getOptions = (domain, path) => {
    return findArea(domain, path).then(res => {
      const { data } = res.data;
      const _data = data.map(item => Object.assign({}, item, { label: item.title, value: item.id }));

      return {
        options: [{ label: 'All', value: null, id: null }].concat(_data),
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      }
    });
  };

  render() {
    const {
      domain, path, idKey, valuePath, placeholder, className, label, labelClass,
      store: { area }
    } = this.props;

    return <div>
      <Typography
        type="caption"
        gutterBottom
        className={`custom-select-title ${labelClass}`}>
        { label }
      </Typography>
      <Async
        name={`body-areas_${idKey}`}
        id={`body-areas_${idKey}`}
        className={className}
        loadOptions={() => this.getOptions(domain, path)}
        onChange={value => updateCrateQuestionFields(value, valuePath)}
        placeholder={placeholder}
        value={area}
        clearable={false}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(AsyncAreaSelect);
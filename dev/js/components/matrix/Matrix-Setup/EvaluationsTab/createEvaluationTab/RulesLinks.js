import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';

// Actions
import {
  updateCrateQuestionFields,
}                                   from '../../../../../actions';

import { Input, Select }            from '../../../../common';

import Grid                         from 'material-ui/Grid';
import Radio                        from 'material-ui/Radio';
import {
  FormControlLabel,
  FormGroup
}                                   from 'material-ui/Form';

const RULES_TYPE = [
  { value: '',         label: 'None'            },
  { value: 'redirect', label: 'Redirect to URL' },
  { value: 'page',     label: 'Redirect in app' },
  { value: 'info',     label: 'Message'         }
];

class RulesLinks extends Component {


  selectedValue = (selected, store, pageOptions) => {
    switch (selected) {
      case 'redirect':
        return <Grid container>
          <Grid item xs={12}>
            <Input
              id='evaluation_result_data.redirect'
              reducer={ store }
              label={ 'URL Address' }
              className="MUIControl"
            />
          </Grid>
        </Grid>;

      case 'page':
        return <Grid container>
          <Grid item xs={12}>
            <Select
              options={pageOptions}
              id='evaluation_result_data.page'
              style={{ width: "100%" }}
              reducer={store}
              label='Industry'
            />
          </Grid>
        </Grid>;

      case 'info':
        return <Grid container >
          <Grid item xs={12}>
            <Input
              id={'evaluation_result_data.info'}
              reducer={ store }
              label={ 'Message' }
              multiline={true}
              className="MUIControl"
              rows="5"
              cols="30"
            />
          </Grid>
        </Grid>;
      default:
    }
  };

  render() {
    const { typeValue, typePath, store, pageOptions } = this.props;

    return <div style={{padding: '0 20px 0 20px'}}>
      <FormGroup>
        <Grid container className="row-item">
          {RULES_TYPE.map((item, index) =>
            (<Grid item xs={3} key={index}>
              <FormControlLabel
                control={
                  <Radio
                    checked={typeValue === item.value}
                    onChange={e => updateCrateQuestionFields(e.target.value === 'on' ? '' : e.target.value, typePath)}
                    value={item.value}
                    aria-label={item.value}
                  />
                }
                label={item.label} />
            </Grid>)
          )}
        </Grid>
      </FormGroup>
      {this.selectedValue(typeValue, store, pageOptions)}
    </div>
  }
}


RulesLinks.defaultProps = {
  typePath   : 'evaluation_result',
  pageOptions: [
    {value: 'main', label: 'Main page'}
  ]
};

RulesLinks.propTypes = {
  typeValue   : PropTypes.string.isRequired,
  typePath    : PropTypes.string,
  pageOptions : PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps    = state => ({store: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RulesLinks);
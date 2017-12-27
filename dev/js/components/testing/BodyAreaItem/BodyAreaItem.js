import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import Grid from 'material-ui/Grid';
import get from 'lodash/get';

import Input from '../../common/Input/Input';
import { diagnosConsts } from '../consts'
// import Switch from '../../common/Switch/Switch';
import Select from '../../common/Select/Select';

class BodyAreaItem extends Component {

  render() {
    const {
      reducer,
      title = 'Area Name',
      id,
    } = this.props;
    const value = get(reducer, `vas_pain_level_area_${id}`, 0);
    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Select
            options={diagnosConsts.painType}
            id={`vas_pain_type_area_${id}`}
            style={{ width: "100%" }}
            reducer={reducer}
            label={`Pain type (${title})`}
          />
        </Grid>
        <Grid item xs={6}>
          <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '12px'  }}>
            <div style={{ display: 'flex', flex: 1, marginRight: '10px'}}>
              <Input
                type="range"
                style={{ width: '100%' }}
                underline="none"
                id={`vas_pain_level_area_${id}`}
                reducer={reducer}
                label={`VAS (${title})`}
                placeholder=" "
              />
            </div>
            <span style={{ display: 'inline-block', marginBottom: '8px', borderBottom: '1px solid #0000006b'}}>
              { value }
            </span>
          </div>

        </Grid>
      </Grid>
    )
  }
}

`q_lang: '',
  q_metric: '',
  q_age: '',
  q_sex: '',
  q_weight: '',
  q_height: '',
  q_pregnant: '',`;

BodyAreaItem.propTypes = {
  toggleModal: PropTypes.func,
  headerTitle: PropTypes.string
};

const mapStateToProps = state => ({
  testingReducer: state.testingReducer,
});

export default connect(mapStateToProps)(BodyAreaItem);
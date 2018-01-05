import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import get from 'lodash/get';

import { diagnosConsts } from '../consts'
import { C } from '../../../components';

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
            <C.Select
              options={diagnosConsts.painType}
              id='vas_pain_type_area_'
              style={{ width: "100%" }}
              reducer={reducer}
              label='Pain type'
            />
          </Grid>
          <Grid item xs={6}>
            <div style={{ display: 'inline-flex', alignSelf: 'flex-end'  }}>
              <C.Range
                reducer={reducer}
                id='vas_pain_level_area_'
                label='Pain Level'
              />
            </div>
          </Grid>
      </Grid>
    )
  }
}

BodyAreaItem.propTypes = {
  toggleModal: PropTypes.func,
  headerTitle: PropTypes.string
};

const mapStateToProps = state => ({
  testingReducer: state.testingReducer,
});

export default connect(mapStateToProps)(BodyAreaItem);
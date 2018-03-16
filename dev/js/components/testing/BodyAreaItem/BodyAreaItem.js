import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';
import get from 'lodash/get';

import { diagnosConsts } from '../consts'
import { C } from '../../../components';
import {
  dispatchTestingPayloadWired,
  onChange,
} from '../../../actions';

class BodyAreaItem extends Component {

  render() {
    const {
      reducer,
      onChange,
      step,
      id,
    } = this.props;
    const value = get(reducer, `q_pain_baseline_VAS${id}`, 0);
    return (
      <Grid container spacing={24}>
          <Grid item xs={6}>
            <C.Select
              options={diagnosConsts.painType}
              id='q_pain_baseline_pain_type.value'
              style={{ width: "100%" }}
              onChangeCustom={(e) => {
                onChange(e);
                dispatchTestingPayloadWired({
                  changingQuestionStep: step,
                  'q_pain_baseline_pain_type.type': 'single',
                })
              }}
              reducer={reducer}
              label='Pain type'
            />
          </Grid>
          <Grid item xs={6}>
            <div style={{ display: 'inline-flex', alignSelf: 'flex-end'  }}>
              <C.Range
                reducer={reducer}
                id='q_pain_baseline_VAS.value'
                onChangeCustom={(e) => {
                  onChange(e);
                  dispatchTestingPayloadWired({
                    changingQuestionStep: step,
                    'q_pain_baseline_VAS.type': 'single',
                  })
                }}
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

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BodyAreaItem);
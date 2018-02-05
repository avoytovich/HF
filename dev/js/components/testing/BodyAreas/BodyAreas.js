import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';

import { C } from '../../../components';
import { dispatchTestingPayloadWired } from '../../../actions';

class BodyAreas extends Component {
  _renderBodyAreasItem = (items = [], step) => {
    return items.map(({ title, id }, i) => {
      return !i ?
        (
          <C.BodyAreaItem
            key={id}
            step={step}
            reducer={this.props.testingReducer}
            title={title}
            id={id}
          />
        ) :
        null;
    })
  };

  render() {
    const {
      areas,
      id,
      testingReducer,
      step,
      testingReducer: {
        bodyAreasPicked,
      }
    } = this.props;
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <p className="testing-inner-sub-header">
              Pain Areas
            </p>
            <Grid container spacing={24}>

              <Grid item xs={12}>
                <C.Select
                  multiple
                  options={areas}
                  onChangeCustom={({ target: { value } }) => {
                    dispatchTestingPayloadWired({
                      bodyAreasPicked     : value,
                      [id]                : { type: 'multiple', value },
                      changingQuestionStep: step,
                    });
                  }}
                  id='bodyAreasPicked'
                  style={{ width: "100%" }}
                  reducer={testingReducer}
                  label='Pain Areas'
                />
              </Grid>
            </Grid>

            { this._renderBodyAreasItem(bodyAreasPicked, step) }

          </Grid>
        </Grid>
      </div>
    )
  }
}

BodyAreas.propTypes = {
  toggleModal: PropTypes.func,
  headerTitle: PropTypes.string
};

const mapStateToProps = state => ({
  testingReducer: state.testingReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BodyAreas);
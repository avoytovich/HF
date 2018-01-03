import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';

import { C } from '../../../components';

class BodyAreas extends Component {
  _renderBodyAreasItem = (items = []) => {
    return items.map(({ title, id }) => {
      return (
        <C.BodyAreaItem
          key={id + title}
          reducer={this.props.testingReducer}
          title={title}
          id={id}
        />
      )
    })
  };

  render() {
    const {
      areas,
      testingReducer,
      testingReducer: {
        bodyAreasPicked,
      }
    } = this.props;
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
              <p className="testing-inner-sub-header">
                Body Areas
              </p>
              <Grid container spacing={24}>

                <Grid item xs={12}>
                  <C.Select
                    multiple
                    options={areas}
                    id='bodyAreasPicked'
                    style={{ width: "100%" }}
                    reducer={testingReducer}
                    label='Body Areas'
                  />
                </Grid>
              </Grid>

              { this._renderBodyAreasItem(bodyAreasPicked) }

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

export default connect(mapStateToProps)(BodyAreas);
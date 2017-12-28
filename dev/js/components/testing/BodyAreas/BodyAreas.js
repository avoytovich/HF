import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';

import Select from '../../common/Select/Select';
import BodyAreaItem from '../BodyAreaItem/BodyAreaItem';
import {
  getBodyAreasWired,
} from '../../../actions';
import { PAGE } from '../../../config';

class BodyAreas extends Component {
  componentWillMount() {
    getBodyAreasWired();
  }

  _renderBodyAreasItem = (items = []) => {
    return items.map(({ title, id }) => {
      return (
        <BodyAreaItem
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
      testingReducer,
      testingReducer: {
        bodyAreas,
        bodyAreasIds,
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
                  <Select
                    multiple
                    options={bodyAreas}
                    id='bodyAreasIds'
                    style={{ width: "100%" }}
                    reducer={testingReducer}
                    label='Body Areas'
                  />
                </Grid>
              </Grid>

              { this._renderBodyAreasItem(bodyAreasIds) }

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
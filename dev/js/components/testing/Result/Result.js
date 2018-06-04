import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import each from 'lodash/each';
import get from 'lodash/get';
import map from 'lodash/map';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';
import AddAlert from 'material-ui-icons/AddAlert';

import { C } from '../../../components'
import { dispatchTestingPayloadWired } from '../../../actions'

class Result extends Component {
  _pickText = (result, treatments) => {
    const { condition } = this.props;
    switch (result) {
      case 'condition':
        return <div>
          <p>{ condition.title }</p>
          <p> Please contact your doctor for further diagnostic.</p>
        </div>;

      case 'question':
        return 'Questions in the queue are missing - please check the rules';

      case 'treatment':
        return (
          <div>
            {
              map(treatments, (treat) => {
                return (
                  <div>
                    <p>Package</p>
                    <p>Package id: {treat.package_id ? treat.package_id : '-'}</p>
                    <p>Package level id: {treat.package_level_id ? treat.package_level_id: '-'}</p>
                  </div>
                )
              })
            }
          </div>
        )
    }
  };

  render() {
    const {
      result,
      label,
      treatments,
    } = this.props;
    return (
      <div className="testing-inner-container-long">
        <h4>Results</h4>
        <h3>
          <AddAlert style={{ color: result === 'treatment' ? 'green' : 'red' }}/>
        </h3>
        <C.Paper
          label={label}
          conditionText={this._pickText(result, treatments)}
        />
      </div>
    );
  }
}

Result.propTypes = {
  label: PropTypes.string,
  result: PropTypes.string,
};

Result.defaultProps = {
  label: 'Result',
  result: 'result',
};

const mapStateToProps = state => ({
  testingReducer: state.testingReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Result);
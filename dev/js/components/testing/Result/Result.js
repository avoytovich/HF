
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import each from 'lodash/each';
import get from 'lodash/get';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';
import AddAlert from 'material-ui-icons/AddAlert';

import { C } from '../../../components'
import { dispatchTestingPayloadWired } from '../../../actions'
import { getTreatments, getPackages, resolve } from '../../../actions/testing/getExistingTest';

class Result extends Component {

  // state = {
  //   treatmentsData: [],
  //   packagesData: []
  // }

  // //get all treatments for future filtering by key
  // componentDidMount(){
  //   getTreatments().then(data => {
  //     this.setState({
  //       treatmentsData: data
  //     });
  //   });
  //   getPackages().then(data => {
  //     this.setState({
  //       packagesData: data
  //     })
  //   })
  //   //Future re-write with Promise.all for remove repeating set state: DRY
  // }

  // createTreatDetail = (treatments) => {
  //   const {allTreatments, allPackages}  = this.props;
  //   console.log(allTreatments);
  //   console.log(allPackages);
  //   if(!isUndefined(allTreatments) && !isUndefined(allPackages)){
  //     return Object.entries(treatments).map(([key, value]) => ({
  //       treatmentName: allTreatments.find(n => n.key === key).title,
  //       packageName: allPackages.find(n => n.id === value.package_id).title
  //     }))
  //   };
  //   return;
  // };

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
              map(treatments, (data, index) => {
                return (
                  <div key={index}>
                    <p>Package id: {data.package_id}</p>
                    <p>Package Level id: {data.package_level_id}</p>
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
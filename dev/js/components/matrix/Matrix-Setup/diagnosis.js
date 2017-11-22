import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DIAGNOSIS_TAB } from '../../../utils/constants/pageContent';
import { TableComponent } from '../../../components/common/TypicalListPage';
import { browserHistory } from 'react-router'
import PageNavigation from '../../common/TypicalListPage/pageNavigation';

class DiagnosisComponent extends Component {
  state = {};

  create = () => {
    browserHistory.push(`/diagnosis-create`);
  };

  render() {
    const { tableHeader } = DIAGNOSIS_TAB;

    return (
      <div id="diagnosis-component">

        <PageNavigation
          path="diagnosis" />

        <TableComponent
          path="diagnosis"
          tableHeader={ tableHeader }
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(DiagnosisComponent);

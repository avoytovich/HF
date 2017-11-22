import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DIAGNOSIS_TAB } from '../../../utils/constants/pageContent';
import { TableComponent } from '../../../components/common/TypicalListPage';
import { browserHistory } from 'react-router'
import PageNavigation from '../../common/TypicalListPage/pageNavigation';
import Button from 'material-ui/Button';

class DiagnosisComponent extends Component {
  buttonsList = [
    {
      title: '+ Create',
      callback: this.create,
    },
    {
      title: 'Edit',
      callback: this.create,
    },
    {
      title: 'Delete',
      callback: this.deleteItems,
    },
    {
      title: 'Deactivate',
      callback: this.deactivate,
    }
  ];

  create = (id) => id ?
      browserHistory.push(`/diagnosis-create`) :
      browserHistory.push(`/diagnosis-create/${id}`);

  deleteItems = (items = []) => {};

  deactivate = (items = []) => {alert('deactivate')};

  render() {
    const { tableHeader } = DIAGNOSIS_TAB;
    return (
      <div id="diagnosis-component">

        <PageNavigation path="diagnosis">

          <Button raised dense>
            + Create
          </Button>

          <Button raised dense>
            Edit
          </Button>

          <Button raised dense>
            Delete
          </Button>

          <Button raised dense>
            Deactivate
          </Button>

        </PageNavigation>

        <TableComponent
          path="diagnosis"
          tableHeader={ tableHeader }
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.diagnosis
});

export default  connect(mapStateToProps)(DiagnosisComponent);

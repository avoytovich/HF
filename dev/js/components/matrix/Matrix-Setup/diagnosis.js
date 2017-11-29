import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { DIAGNOSIS_TAB }    from '../../../utils/constants/pageContent';
import { TableComponent }   from '../../../components/common/TypicalListPage';
import { browserHistory }   from 'react-router'
import PageNavigation       from '../../common/TypicalListPage/pageNavigation';
import Button               from 'material-ui/Button';
import Edit                 from 'material-ui-icons/Edit';
import Delete               from 'material-ui-icons/Delete';
import NotInterested        from 'material-ui-icons/NotInterested';
import DeactivateComponent  from './matrix-crud/deactivateModal';

class DiagnosisComponent extends Component {
  state = {
    selected: [],
    deactivateOpen: false
  };

  create = (id) => id ?
      browserHistory.push(`/diagnosis-create`) :
      browserHistory.push(`/diagnosis-create/${id}`);

  deleteItems = (items = []) => {};

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => this.setState({ [key]: value });

  render() {
    const { tableHeader } = DIAGNOSIS_TAB;
    const { selected, deactivateOpen } = this.state;

    return (
      <div id="diagnosis-component">

        <DeactivateComponent
          path="diagnosis"
          domen="diagnostics"
          list={selected}
          deactivateOpen={deactivateOpen}
          open={this.updateModal}
        />

        <PageNavigation
          path="diagnosis"
          selected={selected}>

          <Button
            disabled={selected.length > 1}
            onClick={() => this.create(selected[0])}
            raised dense>
            <Edit />
            Edit
          </Button>

          <Button raised dense
            onClick={this.deleteItems}>
            <Delete />
            Delete
          </Button>

          <Button raised dense
                  onClick={() => this.updateModal('deactivateOpen', true)}>
            <NotInterested />
            Deactivate
          </Button>

        </PageNavigation>

        <TableComponent
          path="diagnosis"
          domen="diagnostics"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(DiagnosisComponent);

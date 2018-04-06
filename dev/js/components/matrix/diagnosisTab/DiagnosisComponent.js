import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { DIAGNOSIS_TAB }        from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import NotInterested            from 'material-ui-icons/NotInterested';
import DeactivateComponent      from '../../common/Modal/DeactivateModal'
import DeleteComponent          from '../matrix-crud/deleteModal';
import Done                     from 'material-ui-icons/Done';


class DiagnosisComponent extends Component {
  state = {
    selected       : [],
    deactivateOpen : false,
    activateOpen   : false,
    deleteOpen     : false
  };

  create = (id) => {
    const path = id ?
      `/matrix-setup/diagnosis-create/${id}` :
      `/matrix-setup/diagnosis-create-new`;
    browserHistory.push(path)
  };

  deleteItems = (items = []) => {};

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = DIAGNOSIS_TAB;
    const { selected, deactivateOpen, deleteOpen, activateOpen } = this.state;

    return (
      <div id="diagnosis-component">

        <DeactivateComponent
          pathReq="createQuestion"
          path="diagnosis"
          domen="diagnostics"
          typeKey="activateOpen"
          list={selected}
          activate={true}
          deactivateOpen={activateOpen}
          open={this.updateModal}
          itemKey="title"
          title="Activate this Diagnosis?"
          onSubmitTitle="Activate"
          query={this.props.location.query}
        />

        <DeactivateComponent
          pathReq="createQuestion"
          path="diagnosis"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          activate={false}
          deactivateOpen={deactivateOpen}
          open={this.updateModal}
          itemKey="title"
          title="Deactivate this Diagnosis?"
          query={this.props.location.query}
        />

        <DeleteComponent
          title="Delete this Diagnosis?"
          pathReq="createQuestion"
          path="diagnosis"
          domen="diagnostics"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <TableControls
          path="diagnosis"
          selected={selected}
          createItem={() => this.create()}>

          <Button raised dense
            onClick={() => this.updateModal('deleteOpen', true)}>
            <Delete />
            Delete
          </Button>

          <Button raised dense
                  onClick={() => this.updateModal('activateOpen', true)}>
            <Done />
            Activate
          </Button>

          <Button raised dense
                  onClick={() => this.updateModal('deactivateOpen', true)}>
            <NotInterested />
            Deactivate
          </Button>


        </TableControls>

        <TableComponent
          path="diagnosis"
          domen="diagnostics"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onEdit={(id) => this.create(id)}
          onSelectAllClick={this.onSelectAllClick}
          showTestingMarker={true}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(DiagnosisComponent);

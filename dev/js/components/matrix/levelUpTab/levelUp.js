import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { LEVEL_UP }         from '../../../utils/constants/pageContent';
import { TableComponent }   from '../../../components/common/TypicalListPage';
import { browserHistory }   from 'react-router'
import TableControls        from '../../common/TypicalListPage/TableControls';
import Button               from 'material-ui/Button';
import Delete               from 'material-ui-icons/Delete';
import NotInterested        from 'material-ui-icons/NotInterested';
import DeactivateComponent  from '../matrix-crud/deactivateModal'
import DeleteComponent      from '../matrix-crud/deleteModal';
import Done                 from 'material-ui-icons/Done';


class LevelUpComponent extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
    deleteOpen: false,
    activateOpen: false
  };

  create = (id) => id ?
    browserHistory.push(`/matrix-setup/level-up-create/${id}`):
    browserHistory.push(`/matrix-setup/level-up-create-new`);


  deleteItems = (items = []) => {};

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = LEVEL_UP;
    const { selected, deactivateOpen, deleteOpen, activateOpen } = this.state;

    return (
      <div id="diagnosis-component">
        <DeactivateComponent
          path="levelUps"
          pathReq="createQuestion"
          domen="diagnostics"
          list={selected}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
          title="Activate this Level Up?"
          typeKey="activateOpen"
          activate={true}
          onSubmitTitle="Activate"
          deactivateOpen={activateOpen}
        />


        <DeactivateComponent
          path="levelUps"
          pathReq="createQuestion"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          deactivateOpen={deactivateOpen}
          open={this.updateModal}
          itemKey="title"
          title="Deactivate this Level Up?"
          query={this.props.location.query}
        />

        <DeleteComponent
          path="levelUps"
          pathReq="createQuestion"
          domen="diagnostics"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          title="Delete this Level Up?"
          query={this.props.location.query}
        />

        <TableControls
          path="levelUps"
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
          path="levelUps"
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

export default  connect(mapStateToProps)(LevelUpComponent);

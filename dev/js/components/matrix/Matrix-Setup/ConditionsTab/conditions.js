import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { CONDITIONS_TAB }       from '../../../../utils/constants/pageContent';
import { TableComponent }       from '../../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls           from '../../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import NotInterested            from 'material-ui-icons/NotInterested';
import DeactivateComponent      from '../matrix-crud/deactivateModal'
import DeleteComponent          from '../matrix-crud/deleteModal';
import Done                     from 'material-ui-icons/Done';

class ConditionsComponent extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
    deleteOpen: false,
    activateOpen: false
  };

  create = (id) => id ?
    browserHistory.push(`/conditions-create/${id}`):
    browserHistory.push(`/conditions-create-new`);

  deleteItems = (items = []) => {};

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = CONDITIONS_TAB;
    const { selected, deactivateOpen, deleteOpen, activateOpen } = this.state;

    return (
      <div id="conditions-component">

        <DeactivateComponent
          path="conditions"
          domen="diagnostics"
          pathReq="conditions"
          list={selected}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
          typeKey="activateOpen"
          activate={true}
          title="Activate this Conditions?"
          onSubmitTitle="Activate"
          deactivateOpen={activateOpen}
        />

        <DeactivateComponent
          path="conditions"
          pathReq="conditions"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          deactivateOpen={deactivateOpen}
          open={this.updateModal}
          activate={false}
          itemKey="title"
          title="Deactivate this Conditions?"
          query={this.props.location.query}
        />


        <DeleteComponent
          title="Delete this Conditions?"
          path="conditions"
          domen="diagnostics"
          pathReq="conditions"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <TableControls
          path="conditions"
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
          path="conditions"
          domen="diagnostics"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onEdit={(id) => this.create(id)}
          onSelectAllClick={this.onSelectAllClick}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(ConditionsComponent);

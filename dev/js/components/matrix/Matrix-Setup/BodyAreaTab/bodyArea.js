import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { BODY_AREA_TAB }        from '../../../../utils/constants/pageContent';
import { TableComponent }       from '../../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import NotInterested            from 'material-ui-icons/NotInterested';
import DeactivateComponent      from '../matrix-crud/deactivateModal'
import DeleteComponent          from '../matrix-crud/deleteModal';
import Done                     from 'material-ui-icons/Done';


class BodyAreaComponent extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
    deleteOpen: false
  };

  create = (id) => {
    const path = id ? `/body-area-create/${id}` : `/body-area-create-new`;
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
    const { tableHeader } = BODY_AREA_TAB;
    const { selected, deactivateOpen, deleteOpen } = this.state;

    console.log(this.props);
    return (
      <div id="diagnosis-component">

        <DeactivateComponent
          pathReq="createQuestion"
          path="diagnosis"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          deactivateOpen={deactivateOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <DeleteComponent
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
          path="body-area"
          selected={selected}
          createItem={() => this.create()}>

          <Button raised dense
            onClick={() => this.updateModal('deleteOpen', true)}>
            <Delete />
            Delete
          </Button>

          {/*<Button raised dense*/}
                  {/*onClick={() => this.updateModal('activateOpen', true)}>*/}
            {/*<Done />*/}
            {/*Activate*/}
          {/*</Button>*/}

          <Button raised dense
                  onClick={() => this.updateModal('deactivateOpen', true)}>
            <NotInterested />
            Deactivate
          </Button>

        </TableControls>

        <TableComponent
          path="bodyArea"
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
  store: state.tables.bodyArea
});

export default  connect(mapStateToProps)(BodyAreaComponent);

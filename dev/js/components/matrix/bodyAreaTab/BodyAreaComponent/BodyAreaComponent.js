import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { browserHistory }       from 'react-router'
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';

import DeleteComponent          from '../../matrix-crud/deleteModal';
import { TableComponent }       from '../../../common/TypicalListPage';
import TableControls            from '../../../common/TypicalListPage/TableControls';
import { BODY_AREA_TAB }        from '../../../../utils/constants/pageContent';


class BodyAreaComponent extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
  };

  create = (id) => {
    const path = id ? `/body-area-create/${id}` : `/body-area-create-new`;
    browserHistory.push(path)
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = BODY_AREA_TAB;
    const { selected, deleteOpen } = this.state;
    return (
      <div id="diagnosis-component">

        <DeleteComponent
          title="Delete this Pain Zones?"
          pathReq="areas"
          path="bodyArea"
          domen="diagnostics"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <TableControls
          path="bodyArea"
          selected={selected}
          createItem={() => this.create()}>

          <Button raised dense
            onClick={() => this.updateModal('deleteOpen', true)}>
            <Delete />
            Delete
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

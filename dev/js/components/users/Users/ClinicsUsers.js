import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { CLINICS_USERS_TAB }              from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';

import { PAGE } from '../../../config';

class ClinicsUsers extends Component {
  state = {
    selected: [],
    deleteOpen: false
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = CLINICS_USERS_TAB;
    const { selected, deleteOpen } = this.state;
    const querySelector = {...this.props.location.query,...{customer_type: 'clinic'}};
    return (
      <div id="diagnosis-component">

        <DeleteComponent
          location={this.props.location}
          path="clinicsUsers"
          domen="users"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <TableControls
          path="users"
          selected={selected}
          createItem={this.create}>

          <Button raised dense
                  onClick={() => this.updateModal('deleteOpen', true)}>
            <Delete />
            Delete
          </Button>

        </TableControls>

        <TableComponent
          location={this.props.location}
          path="clinicsUsers"
          domen="users"
          reqType="POST"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
          query= {querySelector}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(ClinicsUsers);

import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { CLINICS_TAB }              from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';

import {
  PAGE,
  domen,
  api
} from '../../../config';


class ClinicOwnUsers extends Component {
  state = {
    selected: [],
    deleteOpen: false
  };

  _tableCellPropsFunc = (row, col) => {
    // if (col.key === 'name') {
    //   return {
    //     onClick: (e) => {
    //       e.stopPropagation();
    //       browserHistory.push(`/clinic/${row.id}/profile`);
    //     }
    //   }
    // }
    return {};
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    console.log('here')
    // const { tableHeader } = CLINICS_TAB;
    const { selected, deleteOpen } = this.state;
    const querySelector = {...this.props.location.query,...{type: 'clinic'}};
    // const url = `${domen['users']}${api['clinicsOwnUsers']}/${user_id}?${qs.stringify(this.props.location.query)}`;
    return (
      <div>UsERS</div>
      // <div id="diagnosis-component">
      //
      //   <DeleteComponent
      //     path="companies"
      //     domen="users"
      //     typeKey="deleteOpen"
      //     list={selected}
      //     deactivateOpen={deleteOpen}
      //     open={this.updateModal}
      //     itemKey="title"
      //     query={this.props.location.query}
      //   />
      //
      //   <TableControls
      //     path="companies"
      //     selected={selected}
      //     createItem={this.create}>
      //
      //     <Button raised dense
      //             onClick={() => this.updateModal('deleteOpen', true)}>
      //       <Delete />
      //       Delete
      //     </Button>
      //
      //   </TableControls>
      //
      //   <TableComponent
      //     location={this.props.location}
      //     path="users"
      //     domen="clinicsOwnUsers"
      //     reqType="POST"
      //     tableHeader={ tableHeader }
      //     selected={selected}
      //     onRowClick={this.onRowClick}
      //     onSelectAllClick={this.onSelectAllClick}
      //     query= {querySelector}
      //     tableCellPropsFunc={this._tableCellPropsFunc}
      //   />
      //
      // </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.users
});

export default  connect(mapStateToProps)(ClinicOwnUsers);

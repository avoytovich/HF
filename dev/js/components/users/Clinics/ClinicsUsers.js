import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { USERS_TAB }             from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';
import { get, map }             from 'lodash'

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

  _returnFunc = (param) => {
    if(param==='clinic'){
      browserHistory.push('clinics');
    }
    else {
      browserHistory.push(`/clinic/${this.props.params.id}/profile`)
    }
  };

  render() {
    const { tableHeader } = USERS_TAB;
    const { selected, deleteOpen } = this.state;
    const { profileReducer } = this.props;
    const querySelector = {...this.props.location.query,...{type: 'clinic', store:{}}};
    const url = `${domen['users']}${api['clinicsOwnUsers']}/${this.props.params.id}`;
    return (
      <div id="diagnosis-component">

        <div className="company-sub-header">
          <span onClick={()=>this._returnFunc('clinic')}> Companies </span>
          <span> > </span>
          <span onClick={()=>this._returnFunc('profile')}> {get(profileReducer,'name')}</span>
        </div>

        <DeleteComponent
          path="clinicsOwnUsers"
          domen="users"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <TableControls
          path="clinicOwnUsers"
          selected={selected}
          createItem={this.create}
          createButtonText="Add">

          <Button raised dense
                  onClick={() => this.updateModal('deleteOpen', true)}>
            <Delete />
            Delete
          </Button>

        </TableControls>

        <TableComponent
          url={url}
          location={this.props.location}
          path="clinicOwnUsers"
          domen="users"
          reqType="POST"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
          query= {querySelector}
          tableCellPropsFunc={this._tableCellPropsFunc}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.clinicOwnUsers,
  profileReducer: state.profileReducer
});

export default  connect(mapStateToProps)(ClinicOwnUsers);

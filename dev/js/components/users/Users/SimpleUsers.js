import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { USERS_TAB }            from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import DeactivateComponent      from '../user-modals/deactivateModal';
import DeleteComponent          from '../user-modals/deleteModal';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeleteIcon               from 'material-ui-icons/Delete';
import {domen, api}             from '../../../config';

class SimpleUsers extends Component {
  state = {
    selected: [],
    showActivateModal:false,
    showDeactivateModal:false,
    showDeleteModal:false,
  };

  _tableCellPropsFunc = (row, col) => {
    if (col.key === 'user_id') {
      return {
        onClick: (e) => {
          e.stopPropagation();
          browserHistory.push(`${this.props.location.pathname}/${row.user_id}/profile`);
        }
      }
    }
    return {};
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = USERS_TAB;
    const { selected, showActivateModal, showDeactivateModal, showDeleteModal } = this.state;
    const querySelector = {...this.props.location.query,...{customer_type: 'simple'}};
    const url = `${domen['users']}${api['simpleUsers']}`;
    return (
      <div id="diagnosis-component">

        <TableControls
          locationUrl={this.props.location.pathname}
          path="users"
          selected={selected}
          searchKey = "filter"
        >

          <Button raised dense
                  onClick={() => this.updateModal('showActivateModal', true)}>
            <ActivateIcon/>Activate
          </Button>
          <Button raised dense
                  onClick={() => this.updateModal('showDeactivateModal', true)}>
            <DeactivateIcon/> Deactivate
          </Button>

          <Button raised dense
                  onClick={() => this.updateModal('showDeleteModal', true)}>
            <DeleteIcon/> Delete
          </Button>

        </TableControls>

        <TableComponent
          location={this.props.location}
          path="simpleUsers"
          domen="users"
          reqType="POST"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
          query= {querySelector}
          tableCellPropsFunc={this._tableCellPropsFunc}
        />

        <DeactivateComponent
          pathReq="userProfile"
          path="simpleUsers"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Activate this Users"
          deactivateOpen={showActivateModal}
          open={()=>this.updateModal('showActivateModal', false)}
          itemKey="user_id"
          query={querySelector}
          action="activate"
          onSubmitTitle = "Activate"
        />

        <DeactivateComponent
          pathReq="userProfile"
          path="simpleUsers"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Deactivate this Users"
          deactivateOpen={showDeactivateModal}
          open={()=>this.updateModal('showDeactivateModal', false)}
          itemKey="user_id"
          query={querySelector}
          action="deactivate"
          onSubmitTitle = "Deactivate"
        />

        <DeleteComponent
          pathReq="userProfile"
          path="simpleUsers"
          domen = "users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Delete this Users?"
          deactivateOpen={showDeleteModal}
          open={()=>this.updateModal('showDeleteModal', false)}
          itemKey="user_id"
          query={querySelector}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(SimpleUsers);

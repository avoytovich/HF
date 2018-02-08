import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import {
  PERSONAL_CABINET_USERS_TAB }  from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import DeactivateComponent      from '../../users/user-modals/deactivateModal'
import DeleteComponent          from '../../users/user-modals/deleteModal'
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeleteIcon               from 'material-ui-icons/Delete';
import get                      from 'lodash/get'
import CreateSimpleUser         from '../../users/CreateUser/CreateSimpleUser';
import Modal                    from '../../common/Modal/Modal';
import CSVUploadModal           from '../../common/Modal/CSVUploadModal';
import { toggleCSVModal,
         userCreate,
        dispatchCreateSimpleUserPayloadWired,
        deleteUser }              from '../../../actions';

import {
  PAGE,
  domen,
  api
} from '../../../config';

class PersonalCabinetUsers extends Component {
  state = {
    selected: [],
    showActivateModal:false,
    showDeactivateModal:false,
    showCreateUserModal: false,
    showCSVUploadModal: false,
    showDeleteModal: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showCreateUserModal && nextState.showCreateUserModal) {
      return false
    }
    return true;
  }

  _tableCellPropsFunc = (row, col) => {
    if (col.key === 'user_id') {
      return {
        onClick: (e) => {
          e.stopPropagation();
          browserHistory.push(`/personal-cabinet/users/${row.user_id}/profile`);
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

  createEntity = () => {
    this.setState({ showCreateUserModal: !this.state.showCreateUserModal });
  };

  _createSimpleUser =() =>{
    let location = get(this.props,'location.search');
    const result = {
      customer_id: this.props.userReducer.user_id,
      email: this.props.createSimpleUsersReducers.email,
    };
    userCreate('users', 'createSimpleUser', result)
      .then(() => {
        browserHistory.push(`/personal-cabinet/users${location}`);
        dispatchCreateSimpleUserPayloadWired({email:''});
        this.setState({showCreateUserModal:false})
    })
  };

  _toggleCSVModal=(data)=>{
    toggleCSVModal(data, this, `personal-cabinet/users`, this.props.userReducer.user_id)
  };

  render() {
    const { tableHeader } = PERSONAL_CABINET_USERS_TAB;
    const { selected, showActivateModal, showDeactivateModal, showCreateUserModal,
            showCSVUploadModal, showDeleteModal } = this.state;
    const querySelector = this.props.location.query;
    const url = `${domen['users']}${api['clinicsOwnUsers']}/${this.props.userReducer.user_id}`;
    return (
      <div id="diagnosis-component">

        <TableControls
          locationUrl={this.props.location.pathname}
          path="personalCabinetUsers"
          selected={selected}
          searchKey = "filter"
          createItem={this.createEntity}
          createButtonText="Add"
          tableTitle  = 'Users'
          toggleCSVModal={this._toggleCSVModal}
          uploadCSV={true}
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
          url={url}
          location={this.props.location}
          path="personalCabinetUsers"
          domen="users"
          reqType="POST"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
          query= {querySelector}
          tableTitle = 'Users'
          tableCellPropsFunc={this._tableCellPropsFunc}
        />

        <DeactivateComponent
          pathReq="userProfile"
          path="personalCabinetUsers"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Activate this Users"
          deactivateOpen={showActivateModal}
          open={()=>this.updateModal('showActivateModal', false)}
          itemKey="user_id"
          query={this.props.location.query}
          action="activate"
          onSubmitTitle = "Activate"
        />

        <DeactivateComponent
          pathReq="userProfile"
          path="personalCabinetUsers"
          domen = "users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Deactivate this Users"
          deactivateOpen={showDeactivateModal}
          open={()=>this.updateModal('showDeactivateModal', false)}
          itemKey="user_id"
          query={this.props.location.query}
          action="deactivate"
          onSubmitTitle = "Dectivate"
        />

        <DeleteComponent
          pathReq="userProfile"
          path="personalCabinetUsers"
          domen = "users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Delete this Users"
          deactivateOpen={showDeleteModal}
          open={()=>this.updateModal('showDeleteModal', false)}
          itemKey="user_id"
          query={this.props.location.query}
        />

        <Modal
          itemName="name_real"
          open={showCreateUserModal}
          title='Add user'
          toggleModal={()=>this.updateModal('showCreateUserModal', true)}
          onConfirmClick={() => this._createSimpleUser()}
          CustomContent={() => <CreateSimpleUser />}
        />

        <Modal
          itemName="name_real"
          open={showCSVUploadModal}
          title={this.state.CSVUploadModalTitle}
          toggleModal={this._toggleCSVModal}
          onConfirmClick={() => this.state.CSVUploadModalConfirm()}
          CustomContent={() => <CSVUploadModal />}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis,
  userReducer: state.userReducer,
  createSimpleUsersReducers: state.createSimpleUsersReducers,
  CSVFileReducer :state.CSVFileReducer,
});

export default  connect(mapStateToProps)(PersonalCabinetUsers);

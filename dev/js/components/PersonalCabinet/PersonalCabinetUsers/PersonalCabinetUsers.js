import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import {
  PERSONAL_CABINET_USERS_TAB }  from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import DeactivateComponent      from '../../common/Modal/DeactivateModal'
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import get                      from 'lodash/get'
import CreateSimpleUser         from '../../users/CreateUser/CreateSimpleUser';
import Modal                    from '../../common/Modal/Modal';
import CSVUploadModal           from '../../common/Modal/CSVUploadModal';
import { activateUser,
  toggleCSVModal,
  userCreate,
  userCreateByCSV,
  dispatchCreateSimpleUserPayloadWired}              from '../../../actions';

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

  _toggleActivateModal = (data) => {
    data==='activate'?(this.setState({ showActivateModal: !this.state.showActivateModal })):
      (this.setState({ showDeactivateModal: !this.state.showDeactivateModal }))
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

  _toggleCloseCreateSimpleUser = () => this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  _activateItems = (selected, action) => {
    let currentPage = get(this.props,'store.pagination.current_page');
    activateUser('users', 'userProfile', selected, action)
      .then(() => browserHistory.push(`/personal-cabinet/users?current_page=${currentPage}`));
    this._toggleActivateModal(action);
    this.setState({ selected: []})
  };

  _toggleCSVModal=(data)=>{
    toggleCSVModal(data, this, `personal-cabinet/users`, this.props.userReducer.user_id)
  };

  render() {
    const { tableHeader } = PERSONAL_CABINET_USERS_TAB;
    const { selected, showActivateModal, showDeactivateModal, showCreateUserModal, showCSVUploadModal } = this.state;
    const querySelector = this.props.location.query;
    const url = `${domen['users']}${api['clinicsOwnUsers']}/${this.props.userReducer.user_id}`;
    return (
      <div id="diagnosis-component">

        <DeactivateComponent
          pathReq="createQuestion"
          path="users"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          title="Activate this Users"
          deactivateOpen={showActivateModal}
          open={()=>this._toggleActivateModal('activate')}
          itemKey="user_id"
          query={this.props.location.query}
          onSubmit={()=>this._activateItems(selected, 'activate')}
          onSubmitTitle = "Activate"
        />

        <DeactivateComponent
          pathReq="createQuestion"
          path="users"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          title="Deactivate this Users"
          deactivateOpen={showDeactivateModal}
          open={()=>this._toggleActivateModal('deactivate')}
          itemKey="user_id"
          query={this.props.location.query}
          onSubmit={()=>this._activateItems(selected, 'deactivate')}
        />

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

        <Modal
          itemName="name_real"
          open={showCreateUserModal}
          title='Add user'
          toggleModal={this._toggleCloseCreateSimpleUser}
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

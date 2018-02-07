import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { USERS_TAB }            from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import ArrowRight               from 'material-ui-icons/KeyboardArrowRight';
import { get, map }             from 'lodash';
import Modal                    from '../../common/Modal/Modal';
import CSVUploadModal           from '../../common/Modal/CSVUploadModal';
import CreateSimpleUser         from '../CreateUser/CreateSimpleUser';
import { userCreate,
   userCreateByCSV}           from '../../../actions';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeactivateComponent      from '../../common/Modal/DeactivateModal';
import { activateUser,
  dispatchCSVFilePayloadWired}          from '../../../actions';

import {
  PAGE,
  domen,
  api
} from '../../../config';

class CompanyOwnUsers extends Component {
  state = {
    selected: [],
    showCreateUserModal: false,
    showActivateModal:false,
    showDeactivateModal:false,
    showCSVUploadModal: false,
    CSVUploadModalConfirm: function () {
      console.log('CSVUploadModalConfirm')
    },
    CSVUploadModalTitle: '',
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

  createEntity = () => {
    this.setState({ showCreateUserModal: !this.state.showCreateUserModal });
  };

  _toggleDeleteModal = () => this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  _returnFunc = (param) => {
    if(param==='companies'){
      browserHistory.push('/companies');
    }
    else {
      browserHistory.push(`/company/${this.props.params.id}/profile`)
    }
  };

  _createSimpleUser =() =>{
    const result = {
      customer_id: this.props.params.id,
      email: this.props.createSimpleUsersReducers.email,
      files: this.props.createSimpleUsersReducers.files,
    };

    if(this.props.createSimpleUsersReducers.files.length){
      userCreateByCSV('users', 'createSimpleUserByCSV', result)
        .then(this.setState({showCreateUserModal:false}))
      browserHistory.push(`/company/${this.props.params.id}/users`)
    }
    else{
      userCreate('users', 'createSimpleUser', result)
        .then(this.setState({showCreateUserModal:false}));
      browserHistory.push(`/company/${this.props.params.id}/users`)
    }
  };

  _toggleActivateModal = (data) => {
    data==='activate'?(this.setState({ showActivateModal: !this.state.showActivateModal })):
      (this.setState({ showDeactivateModal: !this.state.showDeactivateModal }))
  };

  _activateItems = (selected, action) => {
    activateUser('users', 'userProfile', selected, action)
      .then(() => browserHistory.push(`/clinic/${this.props.params.id}/users`))
    this._toggleActivateModal(action);
    this.setState({ selected: []})

  };

  _toggleCSVModal=(data)=>{
    console.log('_toggleCSVModal', data);
    switch(data) {
      case 'add':
        this.setState({ showCSVUploadModal: !this.state.showCSVUploadModal,
          CSVUploadModalTitle: 'Add users',
          CSVUploadModalConfirm: ()=>this._userActionByCSV('createSimpleUserByCSV')});
        return;
      case 'activate':
        this.setState({ showCSVUploadModal: !this.state.showCSVUploadModal,
          CSVUploadModalTitle: 'Activate users',
          CSVUploadModalConfirm: ()=>this._userActionByCSV('activateSimpleUserByCSV')});
        return;
      case 'deactivate':
        this.setState({ showCSVUploadModal: !this.state.showCSVUploadModal,
          CSVUploadModalTitle: 'Deactivate users',
          CSVUploadModalConfirm: ()=>this._userActionByCSV('deactivateSimpleUserByCSV')});
        return;
      case 'remove':
        this.setState({ showCSVUploadModal: !this.state.showCSVUploadModal,
          CSVUploadModalTitle: 'Delete users',
          CSVUploadModalConfirm: ()=>this._userActionByCSV('deleteSimpleUserByCSV')});
        return;
      default:
        this.setState({ showCSVUploadModal: false });
        dispatchCSVFilePayloadWired({...this.props.createSimpleUsersReducers,files:[]})
          }
  };

  _userActionByCSV = (api) => {
    const result = {
      customer_id: this.props.params.id,
      files: this.props.CSVFileReducer.files,
    };
    userCreateByCSV('users', api, result)
      .then(()=>{
      browserHistory.push(`/company/${this.props.params.id}/users`);
      this.setState({showCSVUploadModal:false});
      dispatchCSVFilePayloadWired({...this.props.createSimpleUsersReducers,files:[]})
      });
  };


  render() {
    const { tableHeader } = USERS_TAB;
    const { selected, showActivateModal, showCreateUserModal, showDeactivateModal, showCSVUploadModal} = this.state;
    const { profileReducer } = this.props;
    const querySelector = {...this.props.location.query,...{type: 'organization'}};
    const url = `${domen['users']}${api['clinicsOwnUsers']}/${this.props.params.id}`;
    return (
      <div id="diagnosis-component">

        <div className="company-sub-header">
          <span onClick={()=>this._returnFunc('companies')}> Companies </span>
          <ArrowRight className="arrow-right-icon" />
          <span onClick={()=>this._returnFunc('profile')}> {get(profileReducer,'name')}</span>
        </div>

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
          path="companyOwnUsers"
          selected={selected}
          createItem={this.createEntity}
          createButtonText="Add"
          searchKey="filter"
          toggleCSVModal={this._toggleCSVModal}
          uploadCSV={true}>

          <Button raised dense
                  onClick={() => this.updateModal('showActivateModal', true)}>
            <ActivateIcon/> Activate
          </Button>

          <Button raised dense
                  onClick={() => this.updateModal('showDeactivateModal', true)}>
           <DeactivateIcon/> Deactivate
          </Button>

        </TableControls>

        <TableComponent
          url={url}
          location={this.props.location}
          path="companyOwnUsers"
          domen="users"
          reqType="POST"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
          query= {querySelector}
          tableCellPropsFunc={this._tableCellPropsFunc}
        />

        <Modal
          itemName="name_real"
          open={showCreateUserModal}
          title='Add user'
          toggleModal={this._toggleDeleteModal}
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
  store: state.tables.companyOwnUsers,
  profileReducer: state.profileReducer,
  createSimpleUsersReducers: state.createSimpleUsersReducers,
  CSVFileReducer :state.CSVFileReducer,
});

export default  connect(mapStateToProps)(CompanyOwnUsers);

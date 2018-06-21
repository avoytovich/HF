import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { USERS_TAB }            from '../../../utils/constants/pageContent';
import { Api }                  from '../../../utils';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router';
import get                      from 'lodash//get';
import TableControls            from '../../common/TypicalListPage/TableControls';
import DeactivateComponent      from '../user-modals/deactivateModal';
import ChatComponent            from '../user-modals/chatModal';
import DeleteComponent          from '../user-modals/deleteModal';
import CreateSimpleAdminUser    from '../CreateUser/CreateSimpleAdminUser';
import Modal                    from '../../common/Modal/Modal';
import CSVUploadModal           from '../../common/Modal/CSVUploadModal';
import {domen, api}             from '../../../config';
import {
  toggleCSVModalSimple,
  dispatchCreateSimpleUserPayloadWired,
  userCreate, notifier, getListByPost
} from '../../../actions'

import Button                   from 'material-ui/Button';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeleteIcon               from 'material-ui-icons/Delete';
import ChatIcon                 from 'material-ui-icons/Chat';

class SimpleUsers extends Component {
  state = {
    selected: [],
    showCreateUserModal:false,
    showActivateModal:false,
    showDeactivateModal:false,
    showDeleteModal:false,
    showCSVUploadModal: false,
    showChatModal:false
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

  createEntity = () => this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  _toggleDeleteModal = () => this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _createSimpleUser =() =>{
    let location = get(this.props,'location.search');
    const result = {
      customer_id: this.props.params.id,
      email: this.props.createSimpleUsersReducers.email,
    };

    userCreate('users', 'usersSimple', this.props.createSimpleUsersReducers)
      .then(()=>{
        this.setState({showCreateUserModal:false});
        dispatchCreateSimpleUserPayloadWired({errors: {}, email: "", customer_id: '', active: false,
          role:'', first_name:'', last_name:'',});
        browserHistory.push(`/users-simple/${location}`);
      });
  };

  _toggleCSVModal=(data)=>{
    const browserUrl = get(this.props,'location.pathname') + get(this.props,'location.search');
    toggleCSVModalSimple(data, this, browserUrl)
  };

  provideUserData = (list, action, query, url) => {
    list.map((el, id) => {
      Api.post(`${domen.users}/consultant/info/${action}`, {'user_id': list[id].user_id})
        .then(response => {
          if(response.status === 202){
            getListByPost('users', 'simpleUsers', query, url);
          }
        })
    })
  };

  render() {
    const { tableHeader } = USERS_TAB;
    const { selected,
      showActivateModal,
      showDeactivateModal,
      showDeleteModal,
      showCreateUserModal,
      showCSVUploadModal,
      showChatModal} = this.state;
    const querySelector = {...this.props.location.query,...{customer_type: 'simple'}};
    const url = `${domen['users']}${api['simpleUsers']}`;
    return (
      <div id="diagnosis-component">

        <TableControls
          locationUrl={this.props.location.pathname}
          path="simpleUsers"
          selected={selected}
          createItem={this.createEntity}
          createButtonText="Add"
          toggleCSVModal={this._toggleCSVModal}
          uploadCSV={true}
        >

          <Button raised dense
            onClick={()=>{this.provideUserData(selected, 'provide', querySelector, url)}}
            className='identity'
          >
            <ActivateIcon/>Indentity
          </Button>

          <Button raised dense
            onClick={()=>{this.provideUserData(selected, 'hide', querySelector, url)}}
            className='anonymize'
          >
            <DeactivateIcon/> Anonymize
          </Button>

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

          <Button raised dense
                  onClick={() => this.updateModal('showChatModal', true)}>
            <ChatIcon/> Chat
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

        <Modal
          itemName="name_real"
          open={showCreateUserModal}
          title='Add user'
          toggleModal={this._toggleDeleteModal}
          onConfirmClick={() => this._createSimpleUser()}
          CustomContent={() => <CreateSimpleAdminUser />}
        />

        <Modal
          itemName="name_real"
          open={showCSVUploadModal}
          title={this.state.CSVUploadModalTitle}
          toggleModal={this._toggleCSVModal}
          onConfirmClick={() => this.state.CSVUploadModalConfirm()}
          CustomContent={() => <CSVUploadModal />}
        />

        <ChatComponent
          pathReq="userProfile"
          path="simpleUsers"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          deactivateOpen={showChatModal}
          open={()=>this.updateModal('showChatModal', false)}
          itemKey="user_id"
          query={querySelector}
          action="deactivate"
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis,
  createSimpleUsersReducers: state.createSimpleUsersReducers,
  CSVFileReducer :state.CSVFileReducer,
  userReducer: state.userReducer,
});

export default  connect(mapStateToProps)(SimpleUsers);

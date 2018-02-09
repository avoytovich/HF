import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { USERS_TAB }            from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import ArrowRight               from 'material-ui-icons/KeyboardArrowRight';
import get                      from 'lodash/get';
import Modal                    from '../../common/Modal/Modal';
import CSVUploadModal           from '../../common/Modal/CSVUploadModal';
import CreateSimpleUser         from '../CreateUser/CreateSimpleUser';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeleteIcon               from 'material-ui-icons/Delete';
import DeactivateComponent      from '../user-modals/deactivateModal';
import DeleteComponent          from '../user-modals/deleteModal';
import {toggleCSVModal,
  dispatchCreateSimpleUserPayloadWired,
  userCreate     }              from '../../../actions';

import {
  PAGE,
  domen,
  api
} from '../../../config';

class ClinicOwnUsers extends Component {
  state = {
    selected: [],
    showCreateUserModal: false,
    showActivateModal:false,
    showDeactivateModal:false,
    showCSVUploadModal: false,
    showDeleteModal:    false,
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

  _returnFunc = (param) => {
    if(param==='clinic'){
      browserHistory.push('/clinics');
    }
    else {
      browserHistory.push(`/clinic/${this.props.params.id}/profile`)
    }
  };

  _toggleDeleteModal = () => this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  _createSimpleUser =() =>{
    let location = get(this.props,'location.search');
    const result = {
      customer_id: this.props.params.id,
      email: this.props.createSimpleUsersReducers.email,
    };

    userCreate('users', 'createSimpleUser', result)
      .then(()=>{
        this.setState({showCreateUserModal:false});
        dispatchCreateSimpleUserPayloadWired({email:''});
        browserHistory.push(`/clinic/${this.props.params.id}/users${location}`);
      });
  };

  _toggleCSVModal=(data)=>{
    toggleCSVModal(data, this, `/clinic/${this.props.params.id}/users`,this.props.params.id)
  };

  render() {
    const { tableHeader } = USERS_TAB;
    const { selected, showActivateModal, showCreateUserModal, showDeactivateModal,
            showCSVUploadModal, showDeleteModal} = this.state;
    const { profileReducer } = this.props;
    const querySelector = {...this.props.location.query,...{type: 'clinic', store:{}}};
    const url = `${domen['users']}${api['clinicsOwnUsers']}/${this.props.params.id}`;
    return (
      <div id="diagnosis-component">

        <div className="company-sub-header">
          <span onClick={()=>this._returnFunc('clinic')}> Clinics </span>
          <ArrowRight className="arrow-right-icon" />
          <span  onClick={()=>this._returnFunc('profile')}> {get(profileReducer,'name')}</span>
        </div>

        <TableControls
          locationUrl={this.props.location.pathname}
          path="clinicOwnUsers"
          selected={selected}
          createItem={this.createEntity}
          createButtonText="Add"
          searchKey="filter"
          toggleCSVModal={this._toggleCSVModal}
          uploadCSV={true}>

          <Button raised dense
                  onClick={() => this.updateModal('showActivateModal', true)}>
            <ActivateIcon/>Activate
          </Button>
          <Button raised dense
                  onClick={() => this.updateModal('showDeactivateModal', true)}>
          <DeactivateIcon/>  Deactivate
          </Button>

          <Button raised dense
                  onClick={() => this.updateModal('showDeleteModal', true)}>
            <DeleteIcon/> Delete
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

        <DeactivateComponent
          pathReq="userProfile"
          path="clinicOwnUsers"
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
          path="clinicOwnUsers"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Deactivate this Users"
          deactivateOpen={showDeactivateModal}
          open={()=>this.updateModal('showDeactivateModal', false)}
          itemKey="user_id"
          query={this.props.location.query}
          action="deactivate"
          onSubmitTitle = "Deactivate"
        />

        <DeleteComponent
          pathReq="userProfile"
          path="clinicOwnUsers"
          domen = "users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Delete this Users?"
          deactivateOpen={showDeleteModal}
          open={()=>this.updateModal('showDeleteModal', false)}
          itemKey="user_id"
          query={this.props.location.query}
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
  store: state.tables.clinicOwnUsers,
  profileReducer: state.profileReducer,
  createSimpleUsersReducers: state.createSimpleUsersReducers,
  CSVFileReducer :state.CSVFileReducer,
});

export default  connect(mapStateToProps)(ClinicOwnUsers);

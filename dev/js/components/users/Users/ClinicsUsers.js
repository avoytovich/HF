import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { get }                  from 'lodash';
import { CLINICS_USERS_TAB }    from '../../../utils/constants/pageContent';
import { Api }                  from '../../../utils';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import DeactivateComponent      from '../user-modals/deactivateModal';
import ChatComponent            from '../user-modals/chatModal';
import DeleteComponent          from '../user-modals/deleteModal';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeleteIcon               from 'material-ui-icons/Delete';
import ChatIcon                 from 'material-ui-icons/Chat';
import UploadIcon                from 'material-ui-icons/FileUpload';
import Modal                    from '../../common/Modal/Modal';
import CSVUploadModal           from '../../common/Modal/CSVUploadModal';
import {domen, api}             from '../../../config';
import { toggleCSVModal }       from '../../../actions'

class ClinicsUsers extends Component {
  state = {
    selected: [],
    showActivateModal:false,
    showDeactivateModal:false,
    showDeleteModal: false,
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


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  openCSV = () => {
    const browserUrl = get(this.props,'location.pathname') + get(this.props,'location.search');
    toggleCSVModal('add', this, browserUrl, get(this.state.selected, '[0].customer_id'));
  };

  render() {
    const { tableHeader } = CLINICS_USERS_TAB;
    const { state } = this;
    const { selected, showActivateModal,  showDeactivateModal, showDeleteModal, showChatModal} = state;
    const querySelector = {...this.props.location.query,...{customer_type: 'clinic'}};
    const url = `${domen['users']}${api['clinicsUsers']}`;
    return (
      <div id="diagnosis-component">

        <TableControls
          locationUrl={this.props.location.pathname}
          path="clinicsUsers"
          selected={selected}
          createItem={this.create}
          createButtonText="Add"
        >

          <Button raised dense
            onClick={() => {
              selected.map((select, id) => {
                Api.post(`${domen.users}/consultant/info/provide`, {'user_id': selected[id].user_id});
              })
            }}
            className='identity'
          >
            <ActivateIcon/>Indentity
          </Button>
          <Button raised dense
            onClick={() => {
              selected.map((select, id) => {
                Api.post(`${domen.users}/consultant/info/hide`, {'user_id': selected[id].user_id});
              })
            }}
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

          <Button raised dense
                  onClick={() => this.openCSV()}>
            <UploadIcon />
            CSV
          </Button>

        </TableControls>

        <Modal
          itemName="name_real"
          open={state.showCSVUploadModal}
          title={state.CSVUploadModalTitle}
          toggleModal={this._toggleCSVModal}
          onConfirmClick={() => state.CSVUploadModalConfirm()}
          CustomContent={() => <CSVUploadModal />}
        />

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
          tableCellPropsFunc={this._tableCellPropsFunc}
        />

        <DeactivateComponent
          pathReq="userProfile"
          path="clinicsUsers"
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
          path="clinicsUsers"
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
          path="clinicsUsers"
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
  store:          state.tables.diagnosis,
  CSVFileReducer: state.CSVFileReducer
});

export default  connect(mapStateToProps)(ClinicsUsers);

import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { CLINICS_TAB }          from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import ActivateIcon             from 'material-ui-icons/Check';
import DeleteIcon               from 'material-ui-icons/Delete';
import Modal                    from '../../common/Modal/Modal';
import CreateUser               from '../CreateUser/CreateUser';
import DeactivateComponent      from '../user-modals/deactivateModal';
import DeleteComponent          from '../user-modals/deleteModal';
import {domen, api}             from '../../../config';

const userInfo = {
  headerTitle:'Create Clinic',
  backButton : '/clinics',
  userType : 'clinic',
  actionType : 'create',
}

class Clinics extends Component {
  state = {
    selected: [],
    showCreateModal: false,
    showActivateModal:false,
    showDeactivateModal:false,
    showDeleteModal: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showCreateModal && nextState.showCreateModal) {
      return false
    }
    return true;
  }

  _tableCellPropsFunc = (row, col) => {
    if (col.key === 'name') {
      return {
        onClick: (e) => {
          e.stopPropagation();
          browserHistory.push(`/clinic/${row.id}/profile`);
        }
      }
    }
    return {};
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});

  createEntity = () => this.setState({ showCreateModal: !this.state.showCreateModal });

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = CLINICS_TAB;
    const { selected, showCreateModal,showActivateModal,
      showDeactivateModal, showDeleteModal } = this.state;
    const querySelector = {...this.props.location.query,...{type: 'clinic'}};
    const url = `${domen['users']}${api['clinics']}`;
    return (
      <div id="diagnosis-component">

        <TableControls
          path="clinics"
          selected={selected}
          createItem={this.createEntity}
          createButtonText="Add"
          searchKey = "filter">

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
          path="clinics"
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
          pathReq="customers"
          path="clinics"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Activate this Clinics?"
          deactivateOpen={showActivateModal}
          open={()=>this.updateModal('showActivateModal', false)}
          itemKey="name"
          query={querySelector}
          action="activate"
          onSubmitTitle = "Activate"
        />

        <DeactivateComponent
          pathReq="customers"
          path="clinics"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Deactivate this Clinics?"
          deactivateOpen={showDeactivateModal}
          open={()=>this.updateModal('showDeactivateModal', false)}
          itemKey="name"
          query={querySelector}
          action="deactivate"
          onSubmitTitle = "Deactivate"
        />

        <DeleteComponent
          pathReq="customers"
          path="clinics"
          domen = "users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Delete this Clinics?"
          deactivateOpen={showDeleteModal}
          open={()=>this.updateModal('showDeleteModal', false)}
          itemKey="name"
          query={querySelector}
        />

        <Modal
          fullScreen
          open={showCreateModal}
          showControls={false}
          toggleModal={this.createEntity}
          CustomContent={() => <CreateUser userInfo={userInfo} toggleModal={this.createEntity} />}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(Clinics);

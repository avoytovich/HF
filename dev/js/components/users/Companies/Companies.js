import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { COMPANIES_TAB }        from '../../../utils/constants/pageContent';
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
import {
  getListByPost, dispatchUserPayload  }     from '../../../actions'
import {createUsersReducers} from '../../../reducers/createUsersReducers';

const userInfo = {
  headerTitle:'Create Company',
  backButton : '/companies',
  userType : 'organization',
  actionType : 'create',
}

class Companies extends Component {

  /*constructor(props) {
    super(props);
    this.state.createUsersReducers = {...props.createUsersReducers};
  }*/

  state = {
    selected: [],
    showCreateModal: false,
    showActivateModal:false,
    showDeactivateModal:false,
    showDeleteModal: false,
  };

  componentWillMount() {
    getListByPost(
      'users',
      'tariffPlans',
      {
        current_page: "0",
        orderBy: "created_at",
        customer_type: 'organization',
        per_page: "100",
        sortedBy: "desc"
      }
    );
  }

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
          browserHistory.push(`/company/${row.id}/profile`);
        }
      }
    }
    return {};
  };

  onRowClick = (selected = []) => this.setState({ selected });

  onSelectAllClick = (selected) => this.setState({ selected });

  createEntity = () => {
    const { createUsersReducers } = this.props;
    const refresh = ['name', 'email'];
    this.setState({
      showCreateModal: !this.state.showCreateModal,
      /*createUsersReducers: {
        ...this.state.createUsersReducers,
        name: ''
      }*/
    });
    Object.keys(createUsersReducers).map(each =>
      refresh.map(field => (each == field &&
        dispatchUserPayload(createUsersReducers[each] = ''))));
  };

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    //console.log('Companies prop', this.props);
    //console.log('Companies state', this.state);
    const { tableHeader } = COMPANIES_TAB;
    const { selected, showCreateModal,showActivateModal,
      showDeactivateModal, showDeleteModal } = this.state;
    const querySelector = {...this.props.location.query,...{type: 'organization', back :'companies'}};
    const url = `${domen['users']}${api['companies']}`;
    const backButton = `${this.props.location.pathname}/${this.props.location.search}`;
    return (
      <div id="diagnosis-component">

        <TableControls
          path="companies"
          selected={selected}
          createItem={this.createEntity}
          createButtonText="Add"
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
          path="companies"
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
          path="companies"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Activate this Companies?"
          deactivateOpen={showActivateModal}
          open={()=>this.updateModal('showActivateModal', false)}
          itemKey="name"
          query={querySelector}
          action="activate"
          onSubmitTitle = "Activate"
        />

        <DeactivateComponent
          pathReq="customers"
          path="companies"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Deactivate this Companies?"
          deactivateOpen={showDeactivateModal}
          open={()=>this.updateModal('showDeactivateModal', false)}
          itemKey="name"
          query={querySelector}
          action="deactivate"
          onSubmitTitle = "Deactivate"
        />

        <DeleteComponent
          pathReq="customers"
          path="companies"
          domen = "users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Delete this Companies?"
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
          CustomContent={() => <CreateUser userInfo={userInfo} toggleModal={this.createEntity} backButton={backButton} />}
        />


      </div>
    )
  }
}

const mapStateToProps = state => ({
  createUsersReducers: state.createUsersReducers,
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(Companies);

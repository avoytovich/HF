import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { USERS_TAB }             from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';
import { get, map }             from 'lodash';
import Modal                    from '../../common/Modal/Modal';
import CreateSimpleUser from '../CreateUser/CreateSimpleUser';
import { userCreate }     from '../../../actions';

import {
  PAGE,
  domen,
  api
} from '../../../config';

const userInfo = {
  headerTitle:'Create Company',
  backButton : '/companies',
  userType : 'organization',
  tarrifId : '3',
}
class CompanyOwnUsers extends Component {
  state = {
    selected: [],
    deleteOpen: false,
    showCreateUserModal: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showCreateUserModal && nextState.showCreateUserModal) {
      return false
    }
    return true;
  }


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
    console.log(key, value)
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _toggleDeleteModal = () => this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  _returnFunc = (param) => {
    if(param==='companies'){
      browserHistory.push('companies');
    }
    else {
      browserHistory.push(`/company/${this.props.params.id}/profile`)
    }
  };

  _createSimpleUser =() =>{
    const result = {
      customer_id: this.props.params.id,
      email: this.props.createSimpleUsersReducers.email};
    console.log(result);
    userCreate('users', 'createSimpleUser', result)
      .then(this.setState({showCreateUserModal:false}))
    browserHistory.push(`/company/${this.props.params.id}/users`)
  }

  render() {
    const { tableHeader } = USERS_TAB;
    const { selected, deleteOpen, showCreateUserModal} = this.state;
    const { profileReducer } = this.props;
    const querySelector = {...this.props.location.query,...{type: 'organization'}};
    const url = `${domen['users']}${api['clinicsOwnUsers']}/${this.props.params.id}`;
    return (
      <div id="diagnosis-component">

        <div className="company-sub-header">
          <span onClick={()=>this._returnFunc('companies')}> Companies </span>
          <span><img className="arrow-right-icon" src="../../../../assets/images/common/arrow-right.png"/></span>
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
          path="companyOwnUsers"
          selected={selected}
          createItem={() => this.updateModal('showCreateUserModal', true)}
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


      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.companyOwnUsers,
  profileReducer: state.profileReducer,
  createSimpleUsersReducers: state.createSimpleUsersReducers,
});

export default  connect(mapStateToProps)(CompanyOwnUsers);

import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { COMPANIES_TAB }        from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import Modal                    from '../../common/Modal/Modal';
import { PAGE } from '../../../config';
import CreateUser from '../CreateUser/CreateUser';

class Companies extends Component {
  state = {
    selected: [],
    showCreateModal: false,
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

  _createUser =()=>{
    this.props.createUsersReducers.type = 'organization';
    console.log('createUsersReducers',this.props.createUsersReducers);
    this.setState({ showCreateModal: false })
  };

  onRowClick = (selected = []) => this.setState({ selected });

  onSelectAllClick = (selected) => this.setState({ selected });

  createEntity = () => this.setState({ showCreateModal: !this.state.showCreateModal });

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = COMPANIES_TAB;
    const { selected, deleteOpen, showCreateModal } = this.state;
    const querySelector = {...this.props.location.query,...{type: 'organization'}};
    return (
      <div id="diagnosis-component">

        <TableControls
          path="companies"
          selected={selected}
          createItem={this.createEntity}>
          <Button raised dense
                  onClick={() => this.updateModal('deleteOpen', true)}>
            <Delete />
            Delete
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

        <Modal
          itemName="name_real"
          open={showCreateModal}
          title='Create Company'
          toggleModal={this.createEntity}
          CustomContent={() => <CreateUser userType = 'organization' />}
          onConfirmClick={this._createUser}
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

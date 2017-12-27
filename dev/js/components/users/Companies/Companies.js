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
    deleteOpen:false,
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
          browserHistory.push(`/company/${row.id}/profile`);
        }
      }
    }
    return {};
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
    const querySelector = {...this.props.location.query,...{type: 'organization', back :'companies'}};
    return (
      <div id="diagnosis-component">

        <TableControls
          path="companies"
          selected={selected}
          createItem={this.createEntity}
          createButtonText="Add">
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
          fullScreen
          open={showCreateModal}
          showControls={false}
          toggleModal={this.createEntity}
          CustomContent={() => <CreateUser backButton = '/companies' userType = 'organization' toggleModal={this.createEntity} headerTitle='Create Company'/>}
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

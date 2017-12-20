import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import isEmpty                  from 'lodash/isEmpty';
import { COMPANIES_TAB }        from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';
import ModeEdit                 from 'material-ui-icons/ModeEdit';
import Modal                    from '../../common/Modal/Modal';
import { PAGE } from '../../../config';
import CreateUser from '../CreateUser/CreateUser';

class Companies extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
    deleteOpen: false,
    showCreateModal: false,
  };

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

  create = (id) => id ?
    browserHistory.push(`/diagnosis-create`) :
    browserHistory.push(`/diagnosis-create/${id}`);

  onRowClick = (selected = []) => this.setState({ selected });

  onSelectAllClick = (selected) => this.setState({ selected });

  createEntity = () => this.setState({ showCreateModal: !this.state.showCreateModal });
  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = COMPANIES_TAB;
    const { selected, deactivateOpen, deleteOpen, showCreateModal } = this.state;
    const querySelector = {...this.props.location.query,...{type: 'organization'}};
    return (
      <div id="diagnosis-component">

        <TableControls
          path="companies"
          selected={selected}
          createItem={this.createEntity}>

          {/*<Button*/}
          {/*disabled={selected.length > 1}*/}
          {/*onClick={() => this.create(selected[0])}*/}
          {/*raised dense>*/}
          {/*<Edit />*/}
          {/*Edit*/}
          {/*</Button>*/}

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
          onConfirmClick={() => this._createUser(selected)}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(Companies);

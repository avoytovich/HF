import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { CLINICS_TAB }          from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';
import Modal                    from '../../common/Modal/Modal';
import CreateUser               from '../CreateUser/CreateUser';
import { PAGE } from '../../../config';
import DeactivateComponent      from '../../common/Modal/DeactivateModal'
// import DeleteComponent          from '../../../matrix-crud/deleteModal';
import { activateCustomer,
  getMatrixInfo }      from '../../../actions';

const userInfo = {
  headerTitle:'Create Clinic',
  backButton : '/clinics',
  userType : 'clinic',
  actionType : 'create',
}

class Clinics extends Component {
  state = {
    selected: [],
    deleteOpen: false,
    showCreateModal: false,
    showActivateModal:false,
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

  _toggleActivateModal = () => this.setState({ showActivateModal: !this.state.showActivateModal });


  _activateItems=(selected)=>{
    activateCustomer('users', 'customers', selected)
      .then(() => browserHistory.push(`/clinics`))
    this.setState({ showActivateModal: !this.state.showActivateModal, selected: [], })
  }

  render() {
    const { tableHeader } = CLINICS_TAB;
    const { selected, showActivateModal, showCreateModal } = this.state;
    const querySelector = {...this.props.location.query,...{type: 'clinic'}};
    return (
      <div id="diagnosis-component">

        <DeactivateComponent
          pathReq="createQuestion"
          path="users"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          title="Activate this Clinics"
          deactivateOpen={showActivateModal}
          open={this._toggleActivateModal}
          itemKey="name"
          query={this.props.location.query}
          onSubmit={this._activateItems}
          onSubmitTitle = "Activate"
        />

        <TableControls
          path="clinics"
          selected={selected}
          createItem={this.createEntity}
          createButtonText="Add"
          searchKey = "filter">

          <Button raised dense
                  onClick={() => this.updateModal('showActivateModal', true)}>
            Activate
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

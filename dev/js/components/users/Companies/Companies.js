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
import DeactivateComponent      from '../../common/Modal/deactivateModal'
// import DeleteComponent          from '../../../matrix-crud/deleteModal';
import { activateItem,
  getMatrixInfo }      from '../../../actions';

const userInfo = {
  headerTitle:'Create Company',
  backButton : '/companies',
  userType : 'organization',
  tarrifId : '3',
}

class Companies extends Component {
  state = {
    selected: [],
    showDeleteModal:false,
    showActivateModal:false,
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

  _toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal });

  _toggleActivateModal = () => this.setState({ showActivateModal: !this.state.showActivateModal });
  updateModal = (key, value) => {
    console.log(key, value)
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _activateItems=(selected)=>{
    console.log(selected)
    activateItem('users', 'customers', selected)
      .then(() => console.log('sussecc'))
        // getMatrixInfo(domen, path, this.props.query, path)
        //   .then(() => this.props.open(this.props.typeKey, false)))
  }


  render() {
    const { tableHeader } = COMPANIES_TAB;
    const { selected, showActivateModal, showCreateModal } = this.state;
    const querySelector = {...this.props.location.query,...{type: 'organization', back :'companies'}};
    return (
      <div id="diagnosis-component">

        <DeactivateComponent
          pathReq="createQuestion"
          path="users"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          title="Activate this Companies"
          deactivateOpen={showActivateModal}
          open={this._toggleActivateModal}
          itemKey="name"
          query={this.props.location.query}
          onSubmit={this._activateItems}
        />

        <TableControls
          path="companies"
          selected={selected}
          createItem={this.createEntity}
          createButtonText="Add">
          {/*<Button raised dense*/}
                  {/*onClick={() => this.updateModal('showDeleteModal', true)}>*/}
            {/*<Delete />*/}
            {/*Delete*/}
          {/*</Button>*/}

          <Button raised dense
                  onClick={() => this.updateModal('showActivateModal', true)}>
            Activate
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
          CustomContent={() => <CreateUser userInfo={userInfo} toggleModal={this.createEntity}/>}
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

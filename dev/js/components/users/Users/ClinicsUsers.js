import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { CLINICS_USERS_TAB }    from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import DeactivateComponent      from '../../common/Modal/DeactivateModal'
import { activateUser }         from '../../../actions';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import  { get }                  from 'lodash'

class ClinicsUsers extends Component {
  state = {
    selected: [],
    showActivateModal:false,
    showDeactivateModal:false,
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _toggleActivateModal = (data) => {
    data==='activate'?(this.setState({ showActivateModal: !this.state.showActivateModal })):
      (this.setState({ showDeactivateModal: !this.state.showDeactivateModal }))
  };

  _activateItems = (selected, action) => {
    let currentPage = get(this.props,'store.pagination.current_page');
    activateUser('users', 'userProfile', selected, action)
      .then(() => browserHistory.push(`/users-clinics?current_page=${currentPage}`))
    this._toggleActivateModal(action);
    this.setState({ selected: []})

  };


  render() {
    const { tableHeader } = CLINICS_USERS_TAB;
    const { selected, showActivateModal,  showDeactivateModal} = this.state;
    const querySelector = {...this.props.location.query,...{customer_type: 'clinic'}};
    return (
      <div id="diagnosis-component">

        <DeactivateComponent
          pathReq="createQuestion"
          path="users"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          title="Activate this Users"
          deactivateOpen={showActivateModal}
          open={()=>this._toggleActivateModal('activate')}
          itemKey="user_id"
          query={this.props.location.query}
          onSubmit={()=>this._activateItems(selected, 'activate')}
          onSubmitTitle = "Activate"
        />

        <DeactivateComponent
          pathReq="createQuestion"
          path="users"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          title="Deactivate this Users"
          deactivateOpen={showDeactivateModal}
          open={()=>this._toggleActivateModal('deactivate')}
          itemKey="user_id"
          query={this.props.location.query}
          onSubmit={()=>this._activateItems(selected, 'deactivate')}
        />


        <TableControls
          path="users"
          selected={selected}
          createItem={this.create}
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

        </TableControls>

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
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(ClinicsUsers);

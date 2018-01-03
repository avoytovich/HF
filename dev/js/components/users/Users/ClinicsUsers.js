import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { CLINICS_USERS_TAB }              from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import DeactivateComponent      from '../../common/Modal/DeactivateModal'
// import DeleteComponent          from '../../../matrix-crud/deleteModal';
import { activateUser,
  getMatrixInfo }      from '../../../actions';

import { PAGE } from '../../../config';

class ClinicsUsers extends Component {
  state = {
    selected: [],
    showActivateModal:false,
    deleteOpen: false
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _toggleActivateModal = () => this.setState({ showActivateModal: !this.state.showActivateModal });
  updateModal = (key, value) => {
    console.log(key, value)
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _activateItems=(selected)=>{
    console.log(selected)
    activateUser('users', 'userProfile', selected)
      .then(() => console.log('sussecc'))
    this.setState({ showActivateModal: !this.state.showActivateModal,selected: [],})
    // getMatrixInfo(domen, path, this.props.query, path)
    //   .then(() => this.props.open(this.props.typeKey, false)))
  }


  render() {
    const { tableHeader } = CLINICS_USERS_TAB;
    const { selected, showActivateModal } = this.state;
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
          open={this._toggleActivateModal}
          itemKey="customer_name"
          query={this.props.location.query}
          onSubmit={this._activateItems}
          onSubmitTitle = "Activate"
        />

        <TableControls
          path="users"
          selected={selected}
          createItem={this.create}
          createButtonText="Add"
        >

          {/*<Button raised dense*/}
                  {/*onClick={() => this.updateModal('deleteOpen', true)}>*/}
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

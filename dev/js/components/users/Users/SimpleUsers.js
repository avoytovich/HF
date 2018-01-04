import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { USERS_TAB }              from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import DeactivateComponent      from '../../common/Modal/DeactivateModal'
import { activateUser,
  getMatrixInfo }      from '../../../actions';

import { PAGE } from '../../../config';

class SimpleUsers extends Component {
  state = {
    selected: [],
    showActivateModal:false,
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _toggleActivateModal = () => this.setState({ showActivateModal: !this.state.showActivateModal });

  _activateItems=(selected)=>{
    console.log(selected)
    activateUser('users', 'userProfile', selected)
      .then(() => console.log('sussecc'))
    this.setState({ showActivateModal: !this.state.showActivateModal,selected: [],})
    // getMatrixInfo(domen, path, this.props.query, path)
    //   .then(() => this.props.open(this.props.typeKey, false)))
  }


  render() {
    const { tableHeader } = USERS_TAB;
    const { selected, showActivateModal } = this.state;
    const querySelector = {...this.props.location.query,...{customer_type: 'simple'}};
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
        >

          <Button raised dense
                  onClick={() => this.updateModal('showActivateModal', true)}>
            Activate
          </Button>

        </TableControls>

        <TableComponent
          location={this.props.location}
          path="simpleUsers"
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

export default  connect(mapStateToProps)(SimpleUsers);

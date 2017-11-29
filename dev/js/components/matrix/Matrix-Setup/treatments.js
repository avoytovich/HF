import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { TREATMENTS_TAB }       from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import PageNavigation           from '../../common/TypicalListPage/pageNavigation';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import NotInterested            from 'material-ui-icons/NotInterested';
import DeactivateComponent      from './matrix-crud/deactivateModal'
import DeleteComponent          from './matrix-crud/deleteModal';

class ConditionsComponent extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
    deleteOpen: false
  };

  create = (id) => id ?
    browserHistory.push(`/treatments-create`) :
    browserHistory.push(`/treatments-create/${id}`);

  deleteItems = (items = []) => {};

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => this.setState({ [key]: value });
  render() {
    const { tableHeader } = TREATMENTS_TAB;
    const { selected, deactivateOpen, deleteOpen } = this.state;

    return (
      <div id="treatments-component">

        <DeactivateComponent
          path="treatments"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          deactivateOpen={deactivateOpen}
          open={this.updateModal}
          itemKey="title"
        />

        <DeleteComponent
          path="treatments"
          domen="diagnostics"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
        />

        <PageNavigation
          path="treatments"
          selected={selected}>

          <Button raised dense
                  onClick={() => this.updateModal('deleteOpen', true)}>
            <Delete />
            Delete
          </Button>

          <Button raised dense
                  onClick={() => this.updateModal('deactivateOpen', true)}>
            <NotInterested />
            Deactivate
          </Button>

        </PageNavigation>

        <TableComponent
          path="treatments"
          domen="diagnostics"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(ConditionsComponent);

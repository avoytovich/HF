import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { CONDITIONS_TAB }       from '../../../utils/constants/pageContent';
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
    browserHistory.push(`/conditions-create-new`) :
    browserHistory.push(`/conditions-create/${id}`);

  deleteItems = (items = []) => {};

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => this.setState({ [key]: value });
  render() {
    const { tableHeader } = CONDITIONS_TAB;
    const { selected, deactivateOpen, deleteOpen } = this.state;

    return (
      <div id="conditions-component">

        <DeactivateComponent
          path="conditions"
          domen="diagnostics"
          typeKey="deactivateOpen"
          list={selected}
          deactivateOpen={deactivateOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <DeleteComponent
          path="conditions"
          domen="diagnostics"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <PageNavigation
          path="conditions"
          selected={selected}
          createItem={this.create}>

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
          path="conditions"
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

import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { EXERCISES_TAB }        from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls           from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import NotInterested            from 'material-ui-icons/NotInterested';
import DeactivateComponent      from './matrix-crud/deactivateModal'
import DeleteComponent          from './matrix-crud/deleteModal';


class ExercisesComponent extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
    deleteOpen: false
  };

  create = (id) => id ?
    browserHistory.push(`/exercises-create`) :
    browserHistory.push(`/exercises-create/${id}`);


  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => this.setState({ [key]: value });
  render() {
    const { tableHeader } = EXERCISES_TAB;
    const { selected, deactivateOpen, deleteOpen } = this.state;

    return (
      <div id="packages-component">

        <DeactivateComponent
          path="exercises"
          domen="exercises"
          typeKey="deactivateOpen"
          list={selected}
          deactivateOpen={deactivateOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <DeleteComponent
          path="exercises"
          domen="exercises"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <TableControls
          path="exercises"
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

        </TableControls>

        <TableComponent
          path="exercises"
          domen="exercises"
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

export default  connect(mapStateToProps)(ExercisesComponent);

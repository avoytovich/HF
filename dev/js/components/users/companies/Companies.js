import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { SEL_TAB }        from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import PageNavigation           from '../../common/TypicalListPage/pageNavigation';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';


class Companies extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
    deleteOpen: false
  };

  create = (id) => id ?
    browserHistory.push(`/diagnosis-create`) :
    browserHistory.push(`/diagnosis-create/${id}`);

  deleteItems = (items = []) => {};

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = SEL_TAB;
    const { selected, deactivateOpen, deleteOpen } = this.state;

    return (
      <div id="diagnosis-component">

        <DeleteComponent
          path="companies"
          domen="users"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <PageNavigation
          path="companies"
          selected={selected}
          createItem={this.create}>

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

        </PageNavigation>

        <TableComponent
          path="userAll"
          domen="users"
          reqType="POST"
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
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(Companies);

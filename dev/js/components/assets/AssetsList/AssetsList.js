import React, { Component }     from 'react';
import { browserHistory }       from 'react-router'
import { connect }              from 'react-redux';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import ModeEdit                 from 'material-ui-icons/ModeEdit';
import FileUpload               from 'material-ui-icons/FileUpload';

import { ASSETS_TAB }           from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import TableControls            from '../../common/TypicalListPage/TableControls';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';
import { PAGE }                 from '../../../config'


class AssetsList extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
    deleteOpen: false
  };

  deleteItems = (items = []) => {};

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = ASSETS_TAB;
    const { selected, deactivateOpen, deleteOpen } = this.state;

    return (
      <div id="diagnosis-component">

        <DeleteComponent
          path="assets"
          domen="exercises"
          typeKey="deleteOpen"
          list={selected}
          deactivateOpen={deleteOpen}
          open={this.updateModal}
          itemKey="title"
          query={this.props.location.query}
        />

        <TableControls
          path="companies"
          selected={selected}
          createItem={() => browserHistory.push(PAGE.assetsUpload)}
          createButtonText='Upload'
          CreateButtonIcon={() => <FileUpload />}
        >

          {/*<Button*/}
          {/*disabled={selected.length > 1}*/}
          {/*onClick={() => this.create(selected[0])}*/}
          {/*raised dense>*/}
          {/*<Edit />*/}
          {/*Edit*/}
          {/*</Button>*/}

          <Button
            raised
            dense
            onClick={() => this.updateModal('deleteOpen', true)}
          >
            <Delete />
            Delete
          </Button>

          <Button
            raised
            dense
            onClick={() => this.updateModal('deleteOpen', true)}
          >
            <ModeEdit />
            Update
          </Button>

        </TableControls>

        <TableComponent
          path="assets"
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
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(AssetsList);

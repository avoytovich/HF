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
import Modal                    from '../../common/Modal/Modal';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';
import { PAGE }                 from '../../../config'


class AssetsList extends Component {
  state = {
    selected: [],
    showDeleteModal: false,
    deleteOpen: false
  };

  _deleteItems = (items = []) => {};

  _onRowClick = (selected = []) => this.setState({selected});

  _onSelectAllClick = (selected) => this.setState({selected});


  _updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal });

  render() {
    const { tableHeader } = ASSETS_TAB;
    const {
      selected,
      showDeleteModal,
    } = this.state;
    return (
      <div id="diagnosis-component">

        <Modal
          itemName="name_real"
          open={showDeleteModal}
          title='Delete Packages'
          toggleModal={this._toggleDeleteModal}
          items={selected}
          onConfirmClick={() => {}}
        />

        <TableControls
          path="assets"
          selected={selected}
          createItem={() => browserHistory.push(PAGE.assetsUpload)}
          createButtonText='Upload'
          CreateButtonIcon={() => <FileUpload />}
        >
          <Button
            raised
            dense
            onClick={this._toggleDeleteModal}
          >
            <Delete />
            Delete
          </Button>

        </TableControls>

        <TableComponent
          path="assets"
          domen="exercises"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this._onRowClick}
          onSelectAllClick={this._onSelectAllClick}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(AssetsList);

import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';
import Delete from 'material-ui-icons/Delete';
import FileUpload from 'material-ui-icons/FileUpload';
import ModeEdit from 'material-ui-icons/ModeEdit';

import { ASSETS_TAB } from '../../../utils/constants/pageContent';
import { TableComponent } from '../../../components/common/TypicalListPage';
import TableControls from '../../common/TypicalListPage/TableControls';
import Modal from '../../common/Modal/Modal';
import Upload from '../Upload/Upload';
import Edit from '../Edit/Edit';
import {
  PAGE,
} from '../../../config';
import {
  deleteAsset,
  getMatrixInfo,
  dispatchAssetsPayloadWired,
} from '../../../actions';

const domen = 'exercises';
const path  = 'assetsExercises';

class AssetsList extends Component {
  state = {
    selected       : [],
    showDeleteModal: false,
    showUploadModal: false,
    showEditModal  : false,
    deleteOpen     : false
  };

  _deleteItems = (items = []) => {
    const {
      current_page,
      per_page
    } = this.props.location.query;
    const promises = items.map(item => deleteAsset(item.id));
    const query = { per_page, page: current_page};
    return Promise.all(promises)
      .then(res => getMatrixInfo(domen, path, query, path))
      .then(res => this.setState({ selected: [] }))
      .then(res => this._toggleDeleteModal())
      .catch(err => console.log(err))
  };

  _tableCellPropsFunc = (row, col) => {
    if (col.key === 'name') {
      return {
        onClick: (e) => {
          e.stopPropagation();
          dispatchAssetsPayloadWired({ [`tmp_files[${0}]`]: { ...row, progress: 100 } });
          this._toggleEditModal()
        }
      }
    }
    return {};
  };

  _onRowClick = (selected = []) => this.setState({selected});

  _onSelectAllClick = (selected) => this.setState({selected});

  _toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal });

  _toggleUpdateModal = () => this.setState({ showUploadModal: !this.state.showUploadModal });

  _toggleEditModal = () => this.setState({ showEditModal: !this.state.showEditModal });

  render() {
    const { tableHeader } = ASSETS_TAB;
    const {
      selected,
      showDeleteModal,
      showUploadModal,
      showEditModal,
    } = this.state;
    return (
      <div id="diagnosis-component">

        <TableControls
          path={path}
          selected={selected}
          createItem={() => this._toggleUpdateModal()}
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
          location={this.props.location}
          path={path}
          domen={domen}
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this._onRowClick}
          onSelectAllClick={this._onSelectAllClick}
          CellContent={() => <ModeEdit className="assets-edit-icon" />}
          tableCellPropsFunc={this._tableCellPropsFunc}
          query={this.props.location.query}
        />

        <Modal
          itemName="name"
          open={showDeleteModal}
          title='Delete Packages'
          toggleModal={this._toggleDeleteModal}
          items={selected}
          onConfirmClick={() => this._deleteItems(selected)}
        />

        <Modal
          fullScreen
          open={showUploadModal}
          showControls={false}
          toggleModal={this._toggleUpdateModal}
          CustomContent={() => (
            <Upload
              path={path}
              domen={domen}
              query={this.props.location.query}
              type="exercises"
              folder="generateExercises"
              toggleModal={this._toggleUpdateModal}
            />
          )}
        />

        <Modal
          fullScreen
          open={showEditModal}
          showControls={false}
          toggleModal={this._toggleEditModal}
          CustomContent={() => (
            <Edit
              path={path}
              domen={domen}
              query={this.props.location.query}
              type="exercises"
              toggleModal={this._toggleEditModal}
            />
          )}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});


export default  connect(mapStateToProps)(AssetsList);

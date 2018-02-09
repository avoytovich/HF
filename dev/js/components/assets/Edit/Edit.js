import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get'
import omit from 'lodash/omit'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Close from 'material-ui-icons/Close';

import {
  uploadAssets,
  dispatchAssetsPayload,
  editAssetsPreValidate,
  getMatrixInfo,
  T,
} from '../../../actions'
import AssetItem from '../AssetItem/AssetItem'

class Edit extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: `${T.ASSETS}_CLEAR` })
  }

  _onFile = (e) => {
    const acceptedF = [...this.refs.file.tmp_files];
    const { dispatchAssetsPayload } = this.props;
    const tmp_files = acceptedF.map((file) => ({
      file,
      type       : file.type.split('/').shift() === 'image' ? 'image' : 'video',
      name       : file.name.split('.').shift(),
      progress   : 100,
    }));
    dispatchAssetsPayload({ files });
  };

  _renderFiles = (tmp_files = []) => {
    return tmp_files.map(({ progress }, i) => {
      return (
        <AssetItem
          key={i}
          index={i}
          progress={progress}
        />
      )
    });
  };

  _editAssets = (tmp_files = [], type) => {
    if (tmp_files.length) {
      tmp_files = tmp_files.map(file => omit(file, ['progress']));
      editAssetsPreValidate(tmp_files[0], type)
        .then(res => {
          if (res) {
            const {
              domen,
              path,
            } = this.props;
            getMatrixInfo(domen, path, this.props.query, path);
            this.props.toggleModal()
          }
        })
        .catch(err => this.props.toggleModal())
    }
  };

  render() {
    const {
      assetsReducer: {
        tmp_files,
      },
      toggleModal,
      type,
    } = this.props;

    const headerTitle = get(tmp_files[0],'name', 'Upload Files');
    return (
      <div className="upload-container">
        <AppBar
          position="static"
          className="header-custom-black"
        >
          <Toolbar className="AppBar">
            <div className="upload-header-title-container">
              <Close
                className="upload-header-title-icon"
                onClick={() => toggleModal()}
              />
              <p className="upload-header-title"> {headerTitle} </p>
            </div>
            <div>
              <p
                className="upload-header-save-button"
                onClick={() => this._editAssets(tmp_files, type)}
              >
                SAVE
              </p>
            </div>
          </Toolbar>
        </AppBar>
        <div className="change-file-wrapper">
          <p>CHANGE FILE</p>
          <input type="file" ref='file' onChange={this._onFile} className="change-file-input"/>
        </div>
        { this._renderFiles(tmp_files) }
      </div>
    )
  }
}

Edit.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  toggleModal: PropTypes.func,
};

const mapStateToProps = state => ({
  assetsReducer: state.assetsReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchAssetsPayload,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

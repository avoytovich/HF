import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import omit from 'lodash/omit';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Close from 'material-ui-icons/Close';

import {
  getS3Link,
  uploadAssets,
  dispatchAssetsPayload,
  createAssetsPreValidate,
} from '../../../actions'
import AssetItem from '../AssetItem/AssetItem'
import Dropzone from '../Dropzone/Dropzone'

class Upload extends Component {
  _onDrop = (acceptedF, rejectedF) => {
    const { dispatchAssetsPayload } = this.props;
    const files = acceptedF.map(({ type, name }) => ({
      type       : type.split('/').shift() === 'image' ? 'image' : 'video',
      title      : '',
      description: '',
      name       : name.split('.').shift(),
      progress   : 100,
    }));
    dispatchAssetsPayload({ files });
  };

  _renderFiles = (files = []) => {
    if (files.length) {
      return files.map(({ progress }, i) => {
        return (
          <AssetItem
            key={i}
            index={i}
            progress={progress}
          />
        )
      });
    } else {
      return <Dropzone onDrop={this._onDrop} />;
    }
  };

  _createAssets = (files = [], type) => {
    if (files.length) {
      files = files.map(file => {
        file.link = file.link || file.path ;
        return omit(file, ['progress'])
      });
      createAssetsPreValidate({ files: files }, type)
        .then(res => res && this.props.toggleModal())
    }
  };

  render() {
    const {
      assetsReducer: {
        files,
      },
      toggleModal,
      type,
    } = this.props;
    const headerTitle = get(files[0],'name', 'Upload Files');
    return (
      <div className="upload-container">
        <AppBar position="static" className="header-custom-black">
          <Toolbar className="AppBar">
            <div className="upload-header-title-container">
              <Close
                className="upload-header-title-icon"
                onClick={() => toggleModal()}
              />
              <p className="upload-header-title">
                {headerTitle}
              </p>
            </div>

            <div>
              <p
                className="upload-header-save-button"
                onClick={() => this._createAssets(files, type)}
              >
                SAVE
              </p>
            </div>

          </Toolbar>

        </AppBar>
        { this._renderFiles(files) }
      </div>
    )
  }
}

Upload.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

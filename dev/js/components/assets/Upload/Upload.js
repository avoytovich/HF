import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getS3Link,
  uploadAssetsWired,
  dispatchAssetsPayload,
} from '../../../actions'
import AssetItem from '../AssetItem/AssetItem'
import Dropzone from '../Dropzone/Dropzone'

class Upload extends Component {
  _onDrop = (acceptedF, rejectedF) => {
    const {
      dispatchAssetsPayload,
      assetsReducer: {
        tmp_files
      }
    } = this.props;
    dispatchAssetsPayload({ tmp_files: acceptedF });
    if (acceptedF.length) {
      console.log('sent_req');
      acceptedF.map((file, i) => {
        getS3Link(file.name.split('.').pop())
          .then(res => uploadAssetsWired(
            res.url,
            file, // TODO toFormData
            progress => dispatchAssetsPayload({ [`tmp_files[${i}].progress`]: progress })
          ))
      })
    }
  };

  _renderFiles = (files = []) => {
    if (files.length) {
      return files.map((file, i) => {
        return <AssetItem key={i} index={i}/>;
      });
    } else {
      return <Dropzone onDrop={this._onDrop} />
    }
  };

  render() {
    const {
      assetsReducer: {
        tmp_files,
      }
    } = this.props;
    return (
      <div className="upload-container">
        { this._renderFiles(tmp_files) }
      </div>
    )
  }
}

Upload.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  assetsReducer: state.assetsReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchAssetsPayload,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

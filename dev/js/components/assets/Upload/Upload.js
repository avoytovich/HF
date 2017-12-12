import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import FileUpload from 'material-ui-icons/FileUpload';

import { getS3Link } from '../../../actions'
import AssetEdit from '../AssetEdit/AssetEdit'

class Upload extends Component {
  _onDrop = (acceptedF, rejectedF) => {
    acceptedF.map(file => {
      getS3Link(file.name.split('.').pop())
        .then(res => console.log(res))
    })
  };

  render() {
    return (
      <div className="upload-container">
        <AssetEdit />
        <Dropzone
          accept='image/png,image/jpeg,image/bmp,video/mp4'
          multiple
          className="dropzone"
          activeClassName="dropzone-active"
          onDrop={this._onDrop}
        >
         <div>
           <p className="upload-instruction-wrapper">
             <FileUpload />
             Drop files here or click to upload
           </p>
           <p className="upload-instruction-wrapper">
             Format files: .mkv
           </p>
         </div>
        </Dropzone>
      </div>
    );
  }
}

Upload.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
};

export default Upload;

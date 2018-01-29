import React, { Component } from 'react';
import DropzoneLib from 'react-dropzone';
import FileUpload from 'material-ui-icons/FileUpload';

class Dropzone extends Component {
  render() {
    const {
      onDrop
    } = this.props;
    return (
      <DropzoneLib
        accept='image/png,image/jpeg,image/bmp,video/mp4,video/mkv'
        className="dropzone"
        activeClassName="dropzone-active"
        onDrop={onDrop}
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
      </DropzoneLib>
    );
  }
}

export default Dropzone;

import React, { Component } from 'react';
import DropzoneLib from 'react-dropzone';
import FileUpload from 'material-ui-icons/FileUpload';

class Dropzone extends Component {
  render() {
    const {
      onDrop,
      fileTypes,
      fileExtention,
    } = this.props;

    return (
      <DropzoneLib
        accept={fileTypes}
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
            Format files: .{fileExtention}
          </p>
        </div>
      </DropzoneLib>
    );
  }
}

Dropzone.defaultProps = {
  fileTypes: '',
  fileExtention: 'mkv',
}

export default Dropzone;

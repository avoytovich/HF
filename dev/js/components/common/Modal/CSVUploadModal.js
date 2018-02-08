import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  get  from 'lodash/get';
import {dispatchCSVFilePayloadWired} from '../../../actions'
import Dropzone      from '../../assets/Dropzone/Dropzone';
import Delete from 'material-ui-icons/Delete';
import { LinearProgress } from 'material-ui/Progress';
import InsertDriveFile from 'material-ui-icons/InsertDriveFile';


class CSVUploadModal extends Component {

  _renderProgressOrFile = (progress, index) => {
    switch(progress) {
      case 100:
        return;
      default:
        return progress ? <LinearProgress mode="determinate" value={progress} /> :
          <LinearProgress />
    }
  };

  _renderFiles = (files = [], progress) => {
    if (files.length) {
      return files.map((f, i) => {
        return (
        <div className="progress-container" key={i}>
          <div className="progress-name-controls-container">
            <div className="progress-name-controls-sub-container">
              <InsertDriveFile />
              <div className="progress-name">{get(files[i], 'name', '-')}</div>
            </div>
            <Delete
              onClick={() => dispatchCSVFilePayloadWired({...this.props.createSimpleUsersReducers,files:[]})}
              className="c-pointer"
            />
          </div>
          <div className="progress-line-container">
            { this._renderProgressOrFile(progress, i)}
          </div>
        </div>
        )
      });
    } else {
      return (<div className="create-simple-users-drop-zone-container">
        <Dropzone fileTypes = 'text/csv' fileExtention= "csv" onDrop={this._onDrop} />
      </div>);
    }
  };

  _onDrop = (acceptedF, rejectedF) => {
    const files = acceptedF.map(file => ({
      file,
      type       : file.type.split('/').shift(),
      title      : '',
      description: '',
      name       : file.name.split('.').shift(),
      progress   : 100,
    }));
    dispatchCSVFilePayloadWired({files:files})
  };

  render() {
    const {
      CSVFileReducer: {
        files,
        progress,
      }} = this.props;
    return (
      <div className="create-simple-users-content">
          { this._renderFiles(files, progress) }
      </div>)
  }
}

CSVUploadModal.defaultProps = {
  index: 0,
  progress: 0,
};

CSVUploadModal.propTypes = {
  index: PropTypes.number,
  progress: PropTypes.number,
};
const mapStateToProps = state => ({
    CSVFileReducer: state.CSVFileReducer
});

export default connect(mapStateToProps)(CSVUploadModal);

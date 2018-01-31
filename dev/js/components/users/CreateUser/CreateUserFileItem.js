import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InsertDriveFile from 'material-ui-icons/InsertDriveFile';
import Delete from 'material-ui-icons/Delete';
import { LinearProgress } from 'material-ui/Progress';

import { dispatchCreateSimpleUserPayloadWired} from '../../../actions';

class CreateUserFileItem extends Component {
  _renderProgressOrFile = (progress, index) => {
    switch(progress) {
      case 100:
        return;
      default:
        return progress ? <LinearProgress mode="determinate" value={progress} /> :
          <LinearProgress />
    }
  };

  render() {
    const {
      createSimpleUsersReducers: {
        files,
      },
      progress,
      index
    } = this.props;
    return (
      <div className="progress-container">
        <div className="progress-name-controls-container">
          <div className="progress-name-controls-sub-container">
            <InsertDriveFile />
            <div className="progress-name">{get(files[index], 'name', '-')}</div>
          </div>
          <Delete
            onClick={() => dispatchCreateSimpleUserPayloadWired({...this.props.createSimpleUsersReducers,files:[]})}
            className="c-pointer"
          />
        </div>
        <div className="progress-line-container">
          { this._renderProgressOrFile(progress, index)}
        </div>
      </div>
    );
  }
}

CreateUserFileItem.defaultProps = {
  index: 0,
  progress: 0,
};

CreateUserFileItem.propTypes = {
  index: PropTypes.number,
  progress: PropTypes.number,
};

const mapStateToProps = state => ({
  createSimpleUsersReducers: state.createSimpleUsersReducers
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserFileItem);

`{
    "files":[
    {
      "link":"temp/1457018396_servers.png",
      "type":"image", 
      "title":"title",
      "description":"description",
      "name_origin":"name_origin",
      "name_real":"name_real"
    }
  ]
}`;

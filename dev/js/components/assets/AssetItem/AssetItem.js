import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InsertDriveFile from 'material-ui-icons/InsertDriveFile';
import Delete from 'material-ui-icons/Delete';
import Grid from 'material-ui/Grid';
import { LinearProgress } from 'material-ui/Progress';

import Input from '../../common/Input/Input';
import { dispatchDeleteAssetPayloadWired } from '../../../actions';

class AssetItem extends Component {
  _renderProgressOrFile = (progress, index) => {
    const { assetsReducer } = this.props;
    switch(progress) {
      case 100:
        return (
          <Grid container spacing={16}>
            <Grid item xs={3}>
              <Input
                style={{ width: '100%' }}
                id={`tmp_files[${index}].name`}
                reducer={assetsReducer}
                label='File Name'
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                style={{ width: '100%' }}
                id={`tmp_files[${index}].title`}
                reducer={assetsReducer}
                label='Title'
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                style={{ width: '100%' }}
                id={`tmp_files[${index}].description`}
                reducer={assetsReducer}
                label='Description'
              />
            </Grid>
          </Grid>
        );

      default:
        return progress ? <LinearProgress mode="determinate" value={progress} /> :
          <LinearProgress />
    }
  };

  render() {
    const {
      assetsReducer: {
        tmp_files,
      },
      progress,
      index,
      onDeleteClick,
    } = this.props;
    return (
      <div className="progress-container">
        <div className="progress-name-controls-container">
          <div className="progress-name-controls-sub-container">
            <InsertDriveFile />
            <div className="progress-name">{get(tmp_files[index], 'name', '-')}</div>
          </div>
          <Delete
            onClick={() => dispatchDeleteAssetPayloadWired(index)}
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

AssetItem.defaultProps = {
  onDeleteClick: () => console.log('delete clicked'),
  index: 0,
  progress: 0,
}

AssetItem.propTypes = {
  onDeleteClick: PropTypes.func,
  index: PropTypes.number,
  progress: PropTypes.number,
};

const mapStateToProps = state => ({
  assetsReducer: state.assetsReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AssetItem);

`{
    "tmp_files":[
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

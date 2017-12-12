import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InsertDriveFile from 'material-ui-icons/InsertDriveFile';
import Delete from 'material-ui-icons/Delete';
import Grid from 'material-ui/Grid';

import Input from '../../common/Input/Input';

class AssetEdit extends Component {

  render() {
    const {
      assetsReducer,
      index,
      name,
      onDeleteClick,
    } = this.props;
    console.log(assetsReducer);
    return (
      <div className="progress-container">
        <div className="edit-name-controls-container">
          <div className="progress-name-controls-sub-container">
            <InsertDriveFile />
            <div className="progress-name">{name}</div>
          </div>
          <Delete onClick={onDeleteClick} className="c-pointer"/>
        </div>
        <div className="progress-line-container">
          <Grid container spacing={16}>
            <Grid item xs={3}>
              <Input
                style={{ width: '100%' }}
                id={`tmp_files${index}name_real`}
                reducer={assetsReducer}
                label='File Name'
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                style={{ width: '100%' }}
                id={`tmp_files${index}title`}
                reducer={assetsReducer}
                label='Title'
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                style={{ width: '100%' }}
                id={`tmp_files${index}description`}
                reducer={assetsReducer}
                label='Description'
              />
            </Grid>
          </Grid>

        </div>
      </div>
    );
  }
}

AssetEdit.defaultProps = {
  onDeleteClick: () => console.log('delete clicked'),
  name: 'File.png',
}

AssetEdit.propTypes = {
  reducer: PropTypes.object,
  index: PropTypes.number,
  name: PropTypes.string,
  onDeleteClick: PropTypes.func,
};

const mapStateToProps = state => ({
  assetsReducer: state.assetsReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AssetEdit);

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
}`

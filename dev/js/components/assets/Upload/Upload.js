import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getS3Link,
  uploadAssets,
  dispatchAssetsPayload,
} from '../../../actions'
import { getBase64Promise } from '../../../utils'
import AssetItem from '../AssetItem/AssetItem'
import Dropzone from '../Dropzone/Dropzone'

class Upload extends Component {
  _onDrop = (acceptedF, rejectedF) => {
    const { dispatchAssetsPayload } = this.props;
    const tmp_files = acceptedF.map(({ type, name }) => ({
      type: type.split('/').shift() === 'image' ? 'image' : 'video',
      name,
      title: name,
      description: '',
      name_real: name
    }));
    dispatchAssetsPayload({ tmp_files });
    if (acceptedF.length) {
      console.log('sent_req');
      acceptedF.map((file, i) => {
        getS3Link(file.name.split('.').pop())
          .then((res) => getBase64Promise(file)
            .then(reader => {
              uploadAssets(
                res.data.url,
                reader.result.split(',').pop(),
                progress => dispatchAssetsPayload({ [`tmp_files[${i}].progress`]: progress }),
                file.type
              );
              let subSTR = res.data.url.split('?').shift();
              let link   = subSTR.substr(subSTR.indexOf('temp'));
              dispatchAssetsPayload({ [`tmp_files[${i}]link`]: link });
            }));
      })
    }
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
      return (
        <Dropzone
          onDrop={this._onDrop}
        />
      )
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

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
import HeaderAssets from '../HeaderAssets/HeaderAssets'

class Edit extends Component {
  _onDrop = (acceptedF, rejectedF) => {
    const { dispatchAssetsPayload } = this.props;
    const tmp_files = acceptedF.map(({ type, name }) => ({
      type: type.split('/').shift() === 'image' ? 'image' : 'video',
      title: '',
      description: '',
      name_real: name.split('.').shift()
    }));
    dispatchAssetsPayload({ tmp_files });
    if (acceptedF.length) {
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
              let linkLong = res.data.url.split('?').shift();
              let link     = linkLong.substr(linkLong.indexOf('temp'));
              dispatchAssetsPayload({ [`tmp_files[${i}]link`]: link });
            }));
      })
    }
  };

  _renderFiles = (files = []) => {
    return files.map(({ progress }, i) => {
      return (
        <AssetItem
          key={i}
          index={i}
          progress={progress}
        />
      )
    });
  };

  _renderChangeFile = () => {
    return (
      <div className="change-file-wrapper">
        <p>CHANGE FILE</p>
        <input type="file" className="change-file-input"/>
      </div>
    );
  }

  render() {
    const {
      assetsReducer: {
        tmp_files,
      },
      toggleModal,
    } = this.props;
    return (
      <div className="upload-container">
        <HeaderAssets
          headerTitle={tmp_files[0].name_real}
          toggleModal={toggleModal}
        />
        { this._renderChangeFile() }
        { this._renderFiles(tmp_files) }
      </div>
    )
  }
}

Edit.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

`{
    "tmp_files":[
    {
      "link":"temp/1457018396_servers.png",
      "type":"image", 
      "title":"title",
      "description":"description",
      "name_origin":"name_origin",
      "name_real":"name_real" // unique
    }
  ]
}`;

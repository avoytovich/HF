import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import omit from "lodash/omit";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Close from "material-ui-icons/Close";

import {
  getS3Link,
  uploadAssets,
  dispatchAssetsPayload,
  createAssetsPreValidate,
  getMatrixInfo,
  T
} from "../../../actions";
import { getBase64Promise } from "../../../utils";
import AssetItem from "../AssetItem/AssetItem";
import Dropzone from "../Dropzone/Dropzone";

class Upload extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: `${T.ASSETS}_CLEAR` });
  }

  _onDrop = (acceptedF, rejectedF) => {
    const { dispatchAssetsPayload } = this.props;
    const tmp_files = acceptedF.map(({ type, name }) => ({
      type: type.split("/").shift() === "image" ? "image" : "video",
      title: "",
      description: "",
      name_real: name.split(".").shift(),
      name: name.split(".").shift()
    }));
    dispatchAssetsPayload({ tmp_files });
    if (acceptedF.length) {
      acceptedF.map((file, i) => {
        getS3Link(file.name.split(".").pop(), this.props.folder).then(res => {
          uploadAssets(
            res.data.url,
            file,
            progress =>
              dispatchAssetsPayload({ [`tmp_files[${i}].progress`]: progress }),
            file.type
          );
          let linkLong = res.data.url.split("?").shift();
          let link = linkLong.substr(linkLong.indexOf("temp"));
          dispatchAssetsPayload({ [`tmp_files[${i}].link`]: link });
        });
      });
    }
  };

  _renderFiles = (files = []) => {
    if (files.length) {
      return files.map(({ progress }, i) => {
        return <AssetItem key={i} index={i} progress={progress} />;
      });
    } else {
      return <Dropzone onDrop={this._onDrop} />;
    }
  };

  _createAssets = (tmp_files = [], type) => {
    if (tmp_files.length) {
      tmp_files = tmp_files.map(file => {
        file.link = file.link || file.path;
        return omit(file, ["progress"]);
      });
      createAssetsPreValidate({ tmp_files: tmp_files }, type)
        .then(res => {
          if (res) {
            const { path, domen, query } = this.props;
            getMatrixInfo(domen, path, this.props.query, path);
            this.props.toggleModal();
          }
        })
        .catch(error => {
          this.props.toggleModal();
        });
    }
  };
  render() {
    const {
      assetsReducer: { tmp_files },
      toggleModal,
      type
    } = this.props;
    return (
      <div className="upload-container">
        <AppBar position="static" className="header-custom-black">
          <Toolbar className="AppBar">
            <div className="upload-header-title-container">
              <Close
                className="upload-header-title-icon"
                onClick={() => toggleModal()}
              />
              <p className="upload-header-title">Files</p>
            </div>

            <div>
              <p
                className="upload-header-save-button"
                onClick={() => this._createAssets(tmp_files, type)}
              >
                SAVE
              </p>
            </div>
          </Toolbar>
        </AppBar>
        {this._renderFiles(tmp_files)}
      </div>
    );
  }
}

Upload.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  toggleModal: PropTypes.func
};

const mapStateToProps = state => ({
  assetsReducer: state.assetsReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dispatchAssetsPayload,
      dispatch
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);

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

`created_at:1513180318
 extension_origin:"jpg"
 id:15
 name_origin:"jpgasdasd"
 name_real:"jpgasdasd"
 path:"https://s3.eu-central-1.amazonaws.com/heal.dev.public/exercises/temp/d0f95998-5dfa-a4dc-2815-133330911c45.jpg"
 type:"image"
 updated_at:1513180318`;

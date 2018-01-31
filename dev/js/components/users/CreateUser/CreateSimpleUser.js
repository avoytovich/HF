import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';
import  map  from 'lodash/map';
import {dispatchCreateSimpleUserPayloadWired} from '../../../actions'
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Dropzone      from '../../assets/Dropzone/Dropzone';
import {
  toFormData,
} from '../../../utils';
const TABS = [
  { label: 'By EMAIL',  value: true   },
  { label: 'BY IMPORT', value: false  }
];

class CreateSimpleUser extends Component {
  state = {
    showByEmail:true,
  };

  _onDrop = (acceptedF, rejectedF) => {
    console.log(acceptedF, rejectedF);
    const files = acceptedF.map(file => ({
      file,
      type       : file.type.split('/').shift(),
      title      : '',
      description: '',
      name       : file.name.split('.').shift(),
      progress   : 100,
    }));
    console.log(files);
    toFormData(files);
    dispatchCreateSimpleUserPayloadWired({...this.props.createSimpleUsersReducers,files:files, email:''})
  };

  _handleAddUserBy = (value) =>{
    this.setState({ showByEmail: value });
  };

  render() {
    const {createSimpleUsersReducers} = this.props;
    return (
      <div>
        <div>
          <AppBar position="static" color="inherit">
            <Tabs
              value={+!this.state.showByEmail}
              onChange={this._handleAddUserBy}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              {TABS.map((item, i) =>
                <Tab  key={i}
                      label={item.label}
                      onClick={() => this._handleAddUserBy(item.value)}/>)}
            </Tabs>
          </AppBar>
          <div className="create-simple-users-content">
            {this.state.showByEmail ?(<div>
                <Input id='email' reducer={createSimpleUsersReducers} label='Email' placeholder='Email'/>
              </div>):(<div className="create-simple-users-drop-zone-container">
                <Dropzone fileTypes = 'text/csv' fileExtention= "csv" onDrop={this._onDrop} />
              </div>)}
          </div>

        </div>
      </div>


    )
  }
}

const mapStateToProps = state => ({
  createSimpleUsersReducers: state.createSimpleUsersReducers
});

export default connect(mapStateToProps)(CreateSimpleUser);

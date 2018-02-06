import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Input                from '../../common/Input/Input';
import Select               from '../../common/Select/Select';
import  map                 from 'lodash/map';

const language = [
  {label:'English',value:'English'},
  {label:'Swedish',value:'Swedish'}];

class CreateSimpleUser extends Component {

  render() {
    const {profileReducer} = this.props;
    return (
      <div className="edit-simple-user-container">
        <Input id='first_name' reducer={profileReducer} label='First Name' placeholder='First Name'/>
        <Input id='last_name' reducer={profileReducer} label='Last Name' placeholder='Last Name'/>
        <Input id='email' reducer={profileReducer} label='Email' placeholder='Email'/>
        <Input id='country' reducer={profileReducer} label='Country' placeholder='Country'/>
        <Input id='city' reducer={profileReducer} label='City' placeholder='City'/>
        <Select
          options={language}
          id='language'
          style={{ width: "100%" }}
          reducer={profileReducer}
          label='Language'
        />
      </div>

    )
  }
}

const mapStateToProps = state => ({
  profileReducer: state.simpleUserProfileReducer
});

export default connect(mapStateToProps)(CreateSimpleUser);

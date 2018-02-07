import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Input                from '../../common/Input/Input';
import Select               from '../../common/Select/Select';
import  map                 from 'lodash/map';

const language = [
  {label:'English',value:'English'},
  {label:'Swedish',value:'Swedish'}];

class EditSimpleUser extends Component {

  render() {
    const {simpleUserProfileReducer} = this.props;
    return (
      <div className="edit-simple-user-container">
        <Input id='first_name' reducer={simpleUserProfileReducer} label='First Name' placeholder='First Name'/>
        <Input id='last_name' reducer={simpleUserProfileReducer} label='Last Name' placeholder='Last Name'/>
        <Input id='email' reducer={simpleUserProfileReducer} label='Email' placeholder='Email'/>
        <Input id='country' reducer={simpleUserProfileReducer} label='Country' placeholder='Country'/>
        <Input id='city' reducer={simpleUserProfileReducer} label='City' placeholder='City'/>
        <Select
          options={language}
          id='language'
          style={{ width: "100%" }}
          reducer={simpleUserProfileReducer}
          label='Language'
        />
      </div>

    )
  }
}

const mapStateToProps = state => ({
  simpleUserProfileReducer: state.simpleUserProfileReducer
});

export default connect(mapStateToProps)(EditSimpleUser);

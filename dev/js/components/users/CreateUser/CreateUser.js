import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';
import Header from './CreateUserHeader';
import{ map } from 'lodash';
import DeleteIcon  from 'material-ui-icons/Delete';

const industryArray = [
  {label:'Accommodations',value:'Accommodations'},
  {label:'Accounting',value:'Accounting'},
  {label:'Advertising',value:'Advertising'},
  {label:'Aerospace',value:'Aerospace'},
  {label:'Agriculture & Agribusiness',value:'Agriculture & Agribusiness'},
  {label:'Air Transportation',value:'Air Transportation'},
  {label:'Apparel & Accessories',value:'Apparel & Accessories'},
  {label:'Auto',value:'Auto'},
  {label:'Banking',value:'Banking'},
  {label:'Beauty & Cosmetics',value:'Beauty & Cosmetics'},
  {label:'Biotechnology',value:'Biotechnology'},
  {label:'Chemical',value:'Chemical'},
  {label:'Communications',value:'Communications'},
  {label:'Computer',value:'Computer'},
  {label:'Construction',value:'Construction'},
  {label:'Consulting',value:'Consulting'},
  {label:'Consumer Products',value:'Consumer Products'},
  {label:'Education',value:'Education'},
  {label:'Electronics',value:'Electronics'},
  {label:'Employment & Recruitment',value:'Employment & Recruitment'},
  {label:'Energy',value:'Energy'},
  {label:'Entertainment & Recreation',value:'Entertainment & Recreation'},
  {label:'Fashion',value:'Fashion'},
  {label:'Financial Services',value:'Financial Services'},
  {label:'Fine Arts',value:'Fine Arts'},
  {label:'Food & Beverage',value:'Food & Beverage'},
  {label:'Green Technology',value:'Green Technology'},
  {label:'Healthcare',value:'Healthcare'},
  {label:'Information Technology',value:'Information Technology'},
  {label:'Journalism & News',value:'Journalism & News'},
  {label:'Legal Services',value:'Legal Services'},
  {label:'Manufacturing',value:'Manufacturing'},
  {label:'Media & Broadcasting',value:'Media & Broadcasting'},
  {label:'Medical Devices & Supplies',value:'Medical Devices & Supplies'},
  {label:'Mining',value:'Mining'},
  {label:'Motion Pictures & Video',value:'Motion Pictures & Video'},
  {label:'Music',value:'Music'},
  {label:'Pharmaceutical',value:'Pharmaceutical'},
  {label:'Public Administration',value:'Public Administration'},
  {label:'Public Relations',value:'Public Relations'},
  {label:'Publishing',value:'Publishing'},
  {label:'Rail',value:'Rail'},
  {label:'Real Estate',value:'Real Estate'},
  {label:'Retail',value:'Retail'},
  {label:'Sports',value:'Sports'},
  {label:'Technology',value:'Technology'},
  {label:'Telecommunications',value:'Telecommunications'},
  {label:'Tourism',value:'Tourism'},
  {label:'Transportation',value:'Transportation'},
  {label:'Travel',value:'Travel'},
  {label:'Utilities',value:'Utilities'},
  {label:'Web Services',value:'Web Services'},
];

class CreateUser extends Component {

  _deleteContact = (index, array)=>{
    console.log(index, array)
    const removed = array.splice(index,1);
    console.log('deleted', array, removed);
    this.setState({
      createUsersReducers:{
        contact_info:
          {contacts :  array}
      }
    });
    console.log(this.state)
  }

  _addContact = (array)=>{
    console.log(array)
    array.push({
      name: "",
        surname: "",
        email: "",
        phone: ""
    })
    console.log(array);
    this.setState({
      createUsersReducers:{
        contact_info:
          {contacts :  array}
      }
    });
  }

  render() {
    const {createUsersReducers} = this.props;
    console.log(this.props);
    return (
      <div className="upload-container">
        <Header toggleModal={this.props.toggleModal} headerTitle={this.props.headerTitle} backButton={this.props.backButton}
                userType={this.props.userType}/>
        <div className="create-user-main-container">
          <div className="create-user-container">
            <div className="create-user-input-container">
              <h3 className="create-user-title">Information</h3>
              <Input id="name" reducer={createUsersReducers} label='Company / Entity Name' placeholder='Company / Entity Name'/>
              <Input id="legal_info.vat" reducer={createUsersReducers} label='EU VAT nr.' placeholder='EU VAT nr.'/>
              <Input id="legal_info.reg_num" reducer={createUsersReducers}  label='Registration nr. (Non EU)' placeholder='Registration nr. (Non EU)'/>
              <Input id="contact_info.address" reducer={createUsersReducers} label='Address' placeholder='Address'/>
              <Input id="contact_info.region" reducer={createUsersReducers} label='Region' placeholder='Region'/>
              <Input id="contact_info.country" reducer={createUsersReducers} label='Country' placeholder='Country'/>
              <Input id="additional_info.industry" reducer={createUsersReducers} label='Industry'
                 select  currencies={industryArray}/>
            </div>
            <div className="create-user-input-container">
              <h3 className="create-user-title">Billing Address</h3>
              <Input id="billing_info.address" reducer={createUsersReducers} label='Address' placeholder='Address'/>
              <Input id="billing_info.region" reducer={createUsersReducers} label='Region' placeholder='Region'/>
              <Input id="billing_info.country" reducer={createUsersReducers} label='Country' placeholder='Country'/>
            </div>
          </div>

          <div className="create-user-contacts-container">
            <h3 className="create-user-title">Contact Persons</h3>
            {map(createUsersReducers.contact_info.contacts, (el,index) => {
              return(
                <div key={index} className="create-user-input-container">
                 <div className="delete-item-container">
                   <Input id={'contact_info.contacts.'+index+'.name'} reducer={createUsersReducers} label='Name' placeholder='Name'/>
                   <DeleteIcon onClick = {()=>this._deleteContact(index, createUsersReducers.contact_info.contacts)}/>
                 </div>
                  <Input id={'contact_info.contacts.'+index+'.surname'} reducer={createUsersReducers} label='Surname' placeholder='Surname'/>
                  <Input id={'contact_info.contacts.'+index+ '.email'} reducer={createUsersReducers} label='Email' placeholder='Email'/>
                  <Input id={'contact_info.contacts.'+index+'.phone'} reducer={createUsersReducers} label='Phone' placeholder='Phone'/>
                </div>
              )
            })}
            <div className="add-contact-person" onClick = {()=>this._addContact(createUsersReducers.contact_info.contacts)}><span>+</span> ADD CONTACT PERSON </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userReducer: state.userReducer,
  createUsersReducers: state.createUsersReducers
});

export default connect(mapStateToProps)(CreateUser);

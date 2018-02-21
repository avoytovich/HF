import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';
import Header from './CreateUserHeader';
import map  from 'lodash/map';
import get from 'lodash/get'
import DeleteIcon  from 'material-ui-icons/Delete';
import Select from '../../common/Select/Select';
import {dispatchCreateUserPayloadWired} from '../../../actions'

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

  componentWillMount() {
    if(this.props.userInfo){
      return
    }
    dispatchCreateUserPayloadWired(this.props.userData);
  }

  _deleteContact = (index, array)=>{
    const removed = array.splice(index,1);
    this.setState({
      createUsersReducers:{
        contact_info:
          {contacts :  array}
      }
    });
  };

  _addContact = (array)=>{
    array.push({
      name: "",
        surname: "",
        email: "",
        phone: ""
    });
    this.setState({
      createUsersReducers:{
        contact_info:
          {contacts :  array}
      }
    });
  };

  _dublicatePostalCode = ()=>{
    const newBillingData = {billing_info:
      {postal_code: this.props.createUsersReducers.contact_info.postal_code,
        address: this.props.createUsersReducers.contact_info.address,
        country: this.props.createUsersReducers.contact_info.country,
        region: this.props.createUsersReducers.contact_info.region,
      }}
    dispatchCreateUserPayloadWired({...this.props.createUsersReducers,...newBillingData})
  }

  render() {
    const createUsersReducers = { ...this.props.userData, ...this.props.createUsersReducers};
    const contacts = get(createUsersReducers,'contact_info.contacts')||[];
    let tariffPlans = get(this.props,'tariffPlans.data',[]);
    tariffPlans = map(tariffPlans,function(el) {
      return {label : el.name,
        value: el.id};
    });
    return (
      <div className="upload-container">
        <Header toggleModal={this.props.toggleModal} userData = {this.props.userData} userInfo={this.props.userInfo}
                backButton={this.props.backButton}/>
        <div className="create-user-main-container">
          <div className="create-user-container">
            <div className="create-user-input-container">
              <h3 className="create-user-title">Information</h3>
              <Input id="name" reducer={createUsersReducers} label='Company / Entity Name' placeholder='Company / Entity Name'/>
              <Input id="email" reducer={createUsersReducers} label='Email' placeholder='Email'/>
              <Input id="legal_info.vat" reducer={createUsersReducers} label='EU VAT nr.' placeholder='EU VAT nr.'/>
              <Input id="legal_info.reg_num" reducer={createUsersReducers}
                     label='Registration nr. (Non EU)' placeholder='Registration nr. (Non EU)'/>
              <Input id="contact_info.address" reducer={createUsersReducers} label='Address' placeholder='Address'/>
              <Input id="contact_info.region" reducer={createUsersReducers} label='Region' placeholder='Region'/>
              <Input id="contact_info.country" reducer={createUsersReducers} label='Country' placeholder='Country'/>
              <Input id="contact_info.postal_code" reducer={createUsersReducers}
                     label='Postal code' placeholder='Postal code'/>
              <Select
                options={industryArray}
                id='additional_info.industry'
                style={{ width: "100%" }}
                reducer={createUsersReducers}
                label='Industry'
              />
              {
                tariffPlans.length> 0 ?(<Select
                    options={tariffPlans}
                    id='additional_info.tariff_id'
                    style={{ width: "100%" }}
                    reducer={createUsersReducers}
                    label='Tariff Plan'
                  />):''
              }
            </div>
            <div className="create-user-input-container">
              <h3 className="create-user-title">Billing Address</h3>
              <Input id="billing_info.address" reducer={createUsersReducers} label='Address' placeholder='Address'/>
              <Input id="billing_info.region" reducer={createUsersReducers} label='Region' placeholder='Region'/>
              <Input id="billing_info.country" reducer={createUsersReducers} label='Country' placeholder='Country'/>
              <Input id="billing_info.postal_code" reducer={createUsersReducers} label='Postal Code' placeholder='Postal Code'/>
              <div className="add-contact-person" onClick={this._dublicatePostalCode}>Billing Address same as Mailing Address</div>
            </div>
          </div>

          <div className="create-user-container">
          <div className="create-user-contacts-container">
            <h3 className="create-user-title">Contact Persons</h3>
            {map(contacts, (el,index) => {
              return(
                <div key={index} className="create-user-input-container">
                 <div className="delete-item-container">
                   <Input id={`contact_info.contacts[${index}].name`} reducer={createUsersReducers} label='Name' placeholder='Name'/>
                   <DeleteIcon onClick = {()=>this._deleteContact(index, createUsersReducers.contact_info.contacts)}/>
                 </div>
                  <Input id={`contact_info.contacts[${index}].surname`} reducer={createUsersReducers} label='Surname' placeholder='Surname'/>
                  <Input id={`contact_info.contacts[${index}].email`} reducer={createUsersReducers} label='Email' placeholder='Email'/>
                  <Input id={`contact_info.contacts[${index}].phone`} reducer={createUsersReducers} label='Phone' placeholder='Phone'/>
                </div>
              )
            })}
            <div className="add-contact-person" onClick = {()=>this._addContact(createUsersReducers.contact_info.contacts)}><span>+</span> ADD CONTACT PERSON </div>
          </div>
            <div className="create-user-contacts-container">
              <h3 className="create-user-title"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userReducer: state.userReducer,
  createUsersReducers: state.createUsersReducers,
  tariffPlans: state.tables.tariffPlans,
});

export default connect(mapStateToProps)(CreateUser);

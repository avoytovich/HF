import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../common/Input/Input';
import Select from '../../../common/Select/Select';

const tariffTypeArray = [
  {label:'Company',value:'organization'},
  {label:'Clinic',value:'clinic'}];

const tariffPeriodArray = [
  {label:'Month',value:'month'},
  {label:'Week',value:'week'},
  {label:'Day',value:'day'}];

class BillingDetailsModal extends Component {

  render() {
    const {createTariffPlanReducer} = this.props;
    return (
      <div className="create-tariff-plan-content">
        <div className="create-tariff-plan-container">
          <Input id='name' reducer={createTariffPlanReducer} label='Address' placeholder='Address'/>
        </div>

        <div className="create-tariff-plan-container">
          <Input id='subscription_fee' reducer={createTariffPlanReducer} label='Country' placeholder='Country'
                 className="tree-part"/>
          <Input id='cost_per_user' reducer={createTariffPlanReducer} label='Region' placeholder='Region'
                 className="tree-part"/>
          <Input id='cost_per_user' reducer={createTariffPlanReducer} label='ZIP' placeholder='ZIP'
                 className="tree-part"/>
        </div>

        <div className="create-tariff-plan-container">
          <Input id='name' reducer={createTariffPlanReducer} label='Card Number' placeholder='Card Number'/>
        </div>

        <div className="create-tariff-plan-container">
          <Input id='subscription_fee' reducer={createTariffPlanReducer} label='Card expires on' placeholder='Card expires on'
                 className="tree-part"/>
          <Input id='cost_per_user' reducer={createTariffPlanReducer} label='CVC' placeholder='CVC'
                 className="tree-part"/>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createTariffPlanReducer: state.createTariffPlanReducer
});

export default connect(mapStateToProps)(BillingDetailsModal);

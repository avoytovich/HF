import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const tariffTypeArray = [
  {label:'Company',value:'organization'},
  {label:'Clinic',value:'clinic'}];

const tariffPeriodArray = [
  {label:'Month',value:'month'},
  {label:'Week',value:'week'},
  {label:'Day',value:'day'}];

class CreateSimpleUser extends Component {

  render() {
    const {createTariffPlanReducer} = this.props;
    return (
      <div className="create-tariff-plan-content">
        <div className="create-tariff-plan-container">
          <Input id='name' reducer={createTariffPlanReducer} label='Title' placeholder='Title'
                 className="two-part"/>
          <Select
            options={tariffTypeArray}
            id='customer_type'
            reducer={createTariffPlanReducer}
            label='Type'
            className="two-part"
          />
        </div>

        <div className="create-tariff-plan-container">
          <Input id='subscription_fee' reducer={createTariffPlanReducer} label='Cost/Period, $' placeholder='Price, $'
                 className="tree-part"/>
          <Input id='cost_per_user' reducer={createTariffPlanReducer} label='Cost/User, $' placeholder='Cost/User, $'
                 className="tree-part"/>
          <Select
            options={tariffPeriodArray}
            id='period'
            reducer={createTariffPlanReducer}
            label='Period'
            className="tree-part"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createTariffPlanReducer: state.createTariffPlanReducer
});

export default connect(mapStateToProps)(CreateSimpleUser);

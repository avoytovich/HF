import  React, { Component } from 'react';
import  { connect } from 'react-redux';
import  Input from '../../common/Input/Input';
import  Select from '../../common/Select/Select';
import  map  from 'lodash/map';
import  get  from 'lodash/get';
import DeleteIcon  from 'material-ui-icons/Delete';

const tariffTypeArray = [
  {label:'Company',value:'organization'},
  {label:'Clinic',value:'clinic'},
  {label:'Simple',value:'simple'}];

const tariffPeriodArray = [
  {label:'Month',value:'month'},
  {label:'Week',value:'week'},
  {label:'Day',value:'day'}];

class CreateSimpleUser extends Component {
  _deletePricingGroup = (index, array)=>{
    const removed = array.splice(index,1);
    this.setState({
      createTariffPlanReducer:
        {pricing_groups: array}
    });
  };

  _addPricingGroup = (array )=>{
    array.push({
      key:'',
      price:''
    });
    this.setState({
      createTariffPlanReducer:
        {pricing_groups: array}

    });
  };

  render() {
   let pricingGroupsList = this.props.createPricingGroupListReducer;
    pricingGroupsList = map(pricingGroupsList, el => ({
      label : el.title,
      value: el.key
    }));
    const {createTariffPlanReducer} = this.props;
    let pricing_groups = get(createTariffPlanReducer,'pricing_groups');

    return (
      <div className="create-tariff-plan-content">
        <div className="create-tariff-plan-container">
          <Input
            id='name'
            reducer={createTariffPlanReducer}
            label='Title'
            placeholder='Title'
            className="two-part"
          />
          <Select
            options={tariffTypeArray}
            id='customer_type'
            reducer={createTariffPlanReducer}
            label='Type'
            className="two-part"
          />
        </div>

        <div className="create-tariff-plan-container">
          <Input
            id='subscription_fee'
            reducer={createTariffPlanReducer}
            label='Cost/Period, $'
            placeholder='Price, $'
            className="tree-part"
          />
          <Input
            id='cost_per_user'
            reducer={createTariffPlanReducer}
            label='Cost/User, $'
            placeholder='Cost/User, $'
            className="tree-part"
          />
          <Select
            options={tariffPeriodArray}
            id='period'
            reducer={createTariffPlanReducer}
            label='Period'
            className="tree-part"
          />
        </div>

        <div className="create-tariff-plan-container">
          <Input
            id='properties.free_period'
            reducer={createTariffPlanReducer}
            label='Free period, days'
            placeholder='Free period, days'
            className="two-part"
          />
        </div>

        {map(pricing_groups, (el,index) => {
          return(
            <div key={index} className="create-tariff-plan-container">
              <Select
                options={pricingGroupsList}
                id={`pricing_groups.${index}.key`}
                reducer={createTariffPlanReducer}
                label='Type'
                className="two-part"
              />
              <Input
                id={`pricing_groups.${index}.price`}
                reducer={createTariffPlanReducer}
                label='Cost/User, $'
                placeholder='Cost/User, $'
                className="two-part"
              />
              <DeleteIcon onClick = {()=>this._deletePricingGroup(index, createTariffPlanReducer.pricing_groups)}/>
            </div>
          )
        })}
        <div className="add-contact-person" onClick = {()=>this._addPricingGroup(createTariffPlanReducer.pricing_groups)}><span>+</span> ADD PRICING GROUP </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createTariffPlanReducer: state.createTariffPlanReducer,
  createPricingGroupListReducer: state.createPricingGroupListReducer,
});

export default connect(mapStateToProps)(CreateSimpleUser);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const tariffTypeArray = [
  {label:'Company',value:'company'},
  {label:'Clinic',value:'clinic'}];

const tariffPeriodArray = [
  {label:'Monthly',value:'monthly'},
  {label:'Weekly',value:'weekly'},
  {label:'Daily',value:'daily'}];

class CreateSimpleUser extends Component {

  render() {
    const {createTariffPlanReducer} = this.props;
    console.log(createTariffPlanReducer)
    return (
      <div className="create-tariff-plan-content">
        <div className="create-tariff-plan-container">
          <Input id='title' reducer={createTariffPlanReducer} label='Title' placeholder='Title'
                 className="two-part"/>
          <Select
            options={tariffTypeArray}
            id='type'
            reducer={createTariffPlanReducer}
            label='Type'
            className="two-part"
          />
        </div>

        <div className="create-tariff-plan-container">
          <Input id='price' reducer={createTariffPlanReducer} label='Price, $' placeholder='Price, $' helperText="Per period"
                 className="tree-part"/>
          <Input id='cost' reducer={createTariffPlanReducer} label='Cost/User, $' placeholder='Cost/User, $' helperText="Per period"
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

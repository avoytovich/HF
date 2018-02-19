import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';

const tariffPeriodArray = [
  {label:'Month',value:'month'},
  {label:'Week',value:'week'},
  {label:'Day',value:'day'}];

class EditSimpleTariffPlan extends Component {

  render() {
    const {simpleTariffPlanReducer} = this.props;
    return (
      <div className="create-simple-tariff-plan-content">
        <div className="create-simple-tariff-plan-container">
          <Input id='name' reducer={simpleTariffPlanReducer} label='Title' placeholder='Title'
                 />
        </div>

        <div className="create-simple-tariff-plan-container">
          <Input id='cost_per_user' reducer={simpleTariffPlanReducer} label='Cost/User, $' placeholder='Cost/User, $'
                 className="tree-part"/>
          <Select
            options={tariffPeriodArray}
            id='period'
            reducer={simpleTariffPlanReducer}
            label='Period'
            className="simple-tree-part"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  simpleTariffPlanReducer: state.simpleTariffPlanReducer
});

export default connect(mapStateToProps)(EditSimpleTariffPlan);

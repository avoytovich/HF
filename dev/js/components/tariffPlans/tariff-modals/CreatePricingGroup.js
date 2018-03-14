import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';

class CreateSimpleUser extends Component {

  render() {
    const {createTariffPlanReducer} = this.props;
    return (
      <div className="create-tariff-plan-container">
          <Input
            id='name'
            reducer={createTariffPlanReducer}
            label='Title'
            placeholder='Title'
            className="two-part"
          />

          <Input
            id='subscription_fee'
            reducer={createTariffPlanReducer}
            label='Key'
            placeholder='Key'
            className="two-part"
          />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createTariffPlanReducer: state.createTariffPlanReducer
});

export default connect(mapStateToProps)(CreateSimpleUser);

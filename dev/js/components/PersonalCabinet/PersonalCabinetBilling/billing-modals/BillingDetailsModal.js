import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../common/Input/Input';
import Select from '../../../common/Select/Select';
// import stripePackage from 'stripe';

class BillingDetailsModal extends Component {
  componentWillMount (){
    Stripe.setPublishableKey('pk_test_nd2AO9CvcrB17TXhe5kwjd8I');
   console.log('set', Stripe);
  }

  render() {
    // const stripe = stripePackage('sk_test_...');
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
          <Input id='name' reducer={createTariffPlanReducer} label='Card Number' placeholder='Card Number' data-stripe='number'/>
        </div>

        <div className="create-tariff-plan-container">
          <Input id='subscription_fee' reducer={createTariffPlanReducer} label='Card expires on' placeholder='Card expires on'
                 className="tree-part"/>
          <Input id='cost_per_user' reducer={createTariffPlanReducer} label='CVC' placeholder='CVC'
                 className="tree-part"  data-stripe='cvc' />

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createTariffPlanReducer: state.createTariffPlanReducer
});

export default connect(mapStateToProps)(BillingDetailsModal);

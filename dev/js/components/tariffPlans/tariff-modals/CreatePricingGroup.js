import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../common/Input/Input';

class CreateSimpleUser extends Component {

  render() {
    const {createPricingGroupReducer} = this.props;
    return (
      <div className="create-tariff-plan-container">
          <Input
            id='title'
            reducer={createPricingGroupReducer}
            label='Title'
            placeholder='Title'
            className="two-part"
          />

          <Input
            id='key'
            reducer={createPricingGroupReducer}
            label='Key'
            placeholder='Key'
            className="two-part"
          />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createPricingGroupReducer: state.createPricingGroupReducer
});

export default connect(mapStateToProps)(CreateSimpleUser);

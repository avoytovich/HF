import React, { Component }   from 'react';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogContentText,
       DialogTitle }          from 'material-ui/Dialog';
import Slide                  from 'material-ui/transitions/Slide';
import Button                 from 'material-ui/Button';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import Input                  from '../../../common/Input/Input';
import { activateUser,
         getListByPost }      from '../../../../actions';
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';
import {CardElement} from 'react-stripe-elements';


class DeactivateComponent extends Component {

  deactivate = (e,d) => {
    // activateUser(domen, pathReq, list, action)
    //   .then(() =>
    //     getListByPost(domen, path, query, url)
    //       .then(() => this.props.open(this.props.typeKey, false)))
    console.log('SuBmIt',e,d)
  };

  handleSubmit = function (e) {
    console.log(e.currentTarget)
  e.preventDefault();
  console.log(e.currentTarget);
  console.log(this)
  Stripe.card.createToken(e.currentTarget, function (status, response) {
    console.log( status, response );
  });
}

  handleSubmit1 = function (createTariffPlanReducer) {
    console.log(this, createTariffPlanReducer)
    const result = {number: 4242424242424242,
      cvc:123,
      exp_month:2,
      exp_year:2020}
    Stripe.card.createToken(result, function (status, response) {
      console.log( status, response );
      if(status==200){
       console.log('yra')
      }
    });
  }

  transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { list, deactivateOpen, open, typeKey, itemKey, title, onSubmitTitle, profileReducer } = this.props;
     return <Dialog
      open={deactivateOpen}
      transition={this.transition}
      keepMounted
      onRequestClose={() => open(typeKey, false)}
    >
      <DialogTitle> { title } </DialogTitle>

      <DialogContent>

    <Elements>
        <div className="create-tariff-plan-content">
          <div className="create-tariff-plan-container">
            <Input id='billing_info.address' reducer={profileReducer} label='Address' placeholder='Address'/>
          </div>

          <div className="create-tariff-plan-container">
            <Input id='billing_info.region' reducer={profileReducer} label='Country' placeholder='Country'
                   className="tree-part"/>
            <Input id='billing_info.country' reducer={profileReducer} label='Region' placeholder='Region'
                   className="tree-part"/>
            <Input id='billing_info.zip_code' reducer={profileReducer} label='ZIP' placeholder='ZIP'
                   className="tree-part"/>
          </div>

          <div className="create-tariff-plan-container">
            <Input id='billing_info.card.number' reducer={profileReducer} label='Card Number' placeholder='Card Number' data-stripe='number'/>
          </div>

          <div className="create-tariff-plan-container">
            <Input id='billing_info.card.' reducer={profileReducer} label='Card expires on' placeholder='Card expires on'
                   className="tree-part"/>
            <Input id='billing_info.card.' reducer={profileReducer} label='CVC' placeholder='CVC'
                   className="tree-part"  data-stripe='cvc' />

          </div>
        </div>

    </Elements>

      </DialogContent>

       <DialogActions>
         <Button onClick={() => open(typeKey, false)} color="primary">
           Cancel
         </Button>
         <Button type="submit" onClick={()=>this.handleSubmit1(createTariffPlanReducer)} color="primary">
           { onSubmitTitle }
         </Button>
      </DialogActions>

     </Dialog>;

  }
}
// const mapDispatchToProps = dispatch => bindActionCreators({
//   dispatch,
// }, dispatch);

const mapStateToProps = state => ({
  profileReducer: state.profileReducer
});


export default connect(mapStateToProps)(DeactivateComponent)
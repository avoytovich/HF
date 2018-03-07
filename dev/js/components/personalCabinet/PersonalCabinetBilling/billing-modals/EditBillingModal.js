import React, { Component }   from 'react';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogContentText,
       DialogTitle }          from 'material-ui/Dialog';
import Slide                  from 'material-ui/transitions/Slide';
import Button                 from 'material-ui/Button';
import { connect }            from 'react-redux';
import Input                  from '../../../common/Input/Input';
import { activateUser,
         getListByPost }      from '../../../../actions';
import {Elements} from 'react-stripe-elements';
import { userUpdate }     from '../../../../actions';
import get                    from 'lodash/get';


class EditBillingModal extends Component {

  handleSubmit1 = function (profileReducer) {
    const number = get(profileReducer,'billing_info.card.number');
    const exp_month = get(profileReducer,'billing_info.card.exp_month');
    const cvc = get(profileReducer,'billing_info.card.cvc');
    const exp_year = get(profileReducer,'billing_info.card.exp_year');
    const result = {number, cvc, exp_month, exp_year};
    const that = this;

    Stripe.card.createToken(result, function (status, response) {
      if(status==200){
        const new_billing_info = {... get(profileReducer,'billing_info'), ...{stripe_token:response.id}}
        profileReducer.billing_info = new_billing_info;
        userUpdate('users', 'customers', profileReducer.id,  profileReducer)
        that.props.open();
      }
      else{
        new Error("Environment must not be an array")
      }
    });

  };

  transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { list, deactivateOpen, open, typeKey, itemKey, title, onSubmitTitle, profileReducer,createUsersReducers } = this.props;
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
            <Input
              id='billing_info.address'
              reducer={createUsersReducers}
              label='Address'
              placeholder='Address'
            />
          </div>

          <div className="create-tariff-plan-container">
            <Input
              id='billing_info.region'
              reducer={createUsersReducers}
              label='Country'
              placeholder='Country'
              className="tree-part"
            />
            <Input
              id='billing_info.country'
              reducer={createUsersReducers}
              label='Region'
              placeholder='Region'
              className="tree-part"
            />
            <Input
              id='billing_info.zip_code'
              reducer={createUsersReducers}
              label='ZIP'
              placeholder='ZIP'
              className="tree-part"
            />
          </div>

          <div className="create-tariff-plan-container">
            <Input
              id='billing_info.card.number'
              reducer={createUsersReducers}
              label='Card Number'
              placeholder='Card Number'
              data-stripe='number'
            />
          </div>

          <div className="create-tariff-plan-container">
            <Input
              id='billing_info.card.exp_month'
              reducer={createUsersReducers}
              label='expires month'
              placeholder='Card expires on month'
              className="tree-part"
            />
            <Input
              id='billing_info.card.exp_year'
              reducer={createUsersReducers}
              label='expires year'
              placeholder='Card expires on year'
              className="tree-part"
            />
            <Input
              id='billing_info.card.cvc'
              reducer={createUsersReducers}
              label='CVC'
              placeholder='CVC'
              mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              className="tree-part"  data-stripe='cvc'
            />

          </div>
        </div>

    </Elements>

      </DialogContent>

       <DialogActions>
         <Button onClick={() => open(typeKey, false)} color="primary">
           Cancel
         </Button>
         <Button type="submit" onClick={()=>this.handleSubmit1(createUsersReducers)} color="primary">
           { onSubmitTitle }
         </Button>
      </DialogActions>

     </Dialog>;

  }
}

const mapStateToProps = state => ({
  profileReducer: state.profileReducer,
  createUsersReducers: state.createUsersReducers
});


export default connect(mapStateToProps)(EditBillingModal)
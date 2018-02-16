import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { browserHistory }       from 'react-router';
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import EditIcon                 from 'material-ui-icons/Edit';
import { withStyles }           from 'material-ui/styles';
import get                      from 'lodash/get';
import map                      from 'lodash/map';
import Modal                    from '../../common/Modal/Modal';
import DeactivateComponent      from './billing-modals/deactivateModal';
import BillingDetailsModal      from './billing-modals/BillingDetailsModal';
import {getProfileWired }       from '../../../actions';
import {StripeProvider} from 'react-stripe-elements';



const styles = theme => ({
  root:{
    height:'100%',
  },
  button: {
    margin: theme.spacing.unit,
    float : 'right',
  },
  paper:{
    margin: '10px',
    display:'flex',
    width:'100%',
  }

});

const billingDetails = [
  {title:'Credit Card', path: 'billing_info.credit_card'},
  {title:'Card expires on', path: 'billing_info.expires_on'},
  {title:'Address', path: 'billing_info.address'},
  {title:'Country', path: 'billing_info.country'},
  {title:'Region', path: 'billing_info.region'},
  {title:'Zip Code', path: 'billing_info.postal_code'},
];

const tariffPlan = [
  {title:'Cost/User', sign:'$', path: 'cost_per_user'},
  {title:'Price/Period',sign:'$', path: 'subscription_fee'},
  {title:'Period', path: 'period'}
];

class PersonalCabinetBilling extends Component {

  state = {
    showEditBillingDetailsModal: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showEditBillingDetailsModal && nextState.showEditBillingDetailsModal) {
      return false
    }
    return true;
  }

  componentWillMount (){
    getProfileWired(this.props.userReducer.user_id,'customers');
    Stripe.setPublishableKey('pk_test_nd2AO9CvcrB17TXhe5kwjd8I');
    console.log('set', Stripe);
  }

  _renderItem =(el, index, profileReducer)=>{
    return (
      <div className = 'profile-paper-data' key={el.path}>
        <div className = 'profile-paper-data-title'>
          {el.title}
        </div>
        <div className = 'profile-paper-data-info'>
          {el.sign||''}{get(profileReducer, el.path,'-')}
        </div>
      </div>
    )
  };

  _openEditModal = () => {
    console.log('on edit')
    this.setState({ showEditBillingDetailsModal: !this.state.showEditBillingDetailsModal })
  };

  _updateBillingDate=(e,d)=>{
    console.log('on submit')
    console.log(this,e,d)
    this.setState({ showEditBillingDetailsModal: !this.state.showEditBillingDetailsModal })
  }

  render() {
    const {showEditBillingDetailsModal} = this.state;
    const {
      classes,
      profileReducer
    } = this.props;

    return (
      <div className="profile-main-container">
        <div className="profile-sub-header">
          <span className="profile-name">Billing</span>
        </div>
        <div><Grid className={classes.root}
                   container
                   direction='row'
                   justify='space-around'
        >
          <Grid item xs={12} sm={6} className = 'information-block'>
            <Paper className={classes.paper}>
              <div className = 'profile-paper-container'>
                <div className = 'profile-paper-sub-header'>Billing Details <EditIcon onClick={this._openEditModal}/></div>
                <div className = 'profile-paper-data-container'>
                  {map(billingDetails, (el,index) => this._renderItem(el,index,profileReducer))}
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} className = 'information-block'>
            <Paper className={classes.paper}>
              <div className = 'profile-paper-container'>
                <div className = 'profile-paper-sub-header'>Tariff Plan</div>
                <div className = 'profile-paper-data-container'>
                  {map(tariffPlan, (el,index) => this._renderItem(el,index,profileReducer))}
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid></div>

        <div><Grid className={classes.root}
                   container
                   alignItems='flex-start'
                   direction='row'
                   justify='space-around'
        >
          <Grid item xs={12} sm={12} className = 'information-block'>
            <Paper className={classes.paper}>
              Data
            </Paper>
          </Grid>
        </Grid></div>


        {/*<Modal*/}
          {/*itemName="name_real"*/}
          {/*open={showEditBillingDetailsModal}*/}
          {/*title='Billing Details'*/}
          {/*toggleModal={this._openEditModal}*/}
          {/*onConfirmClick={this._updateBillingDate}*/}
          {/*CustomContent={() => <BillingDetailsModal />}*/}
        {/*/>*/}
        <StripeProvider apiKey="pk_test_nd2AO9CvcrB17TXhe5kwjd8I">
        <DeactivateComponent
          pathReq="userProfile"
          path="clinicOwnUsers"
          domen="users"
          typeKey="deactivateOpen"
          title="Billing"
          deactivateOpen={showEditBillingDetailsModal}
          open={this._openEditModal}
          itemKey="user_id"
          query={this.props.location.query}
          action="deactivate"
          onSubmitTitle = "Submit"
        />
        </StripeProvider>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  profileReducer: state.profileReducer,
  createSimpleUsersReducers: state.createSimpleUsersReducers,
  userReducer: state.userReducer
});

export default  connect(mapStateToProps)(withStyles(styles)(PersonalCabinetBilling));

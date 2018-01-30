import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { browserHistory }       from 'react-router'
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import { withStyles }           from 'material-ui/styles';
import get                      from 'lodash/get';
import map                      from 'lodash/map';
import Modal                    from '../../common/Modal/Modal';
import CreateUser               from '../../users/CreateUser/CreateUser';
import {getProfileWired }       from '../../../actions'

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

const mainInformation = [
  {title:'Company / Entity Name', path: 'name'},
  {title:'EU VAT nr.', path: 'legal_info.vat'},
  {title:'Registration nr. (Non EU)', path: 'legal_info.reg_num'},
  {title:'Address', path: 'billing_info.address'},
  {title:'Region', path: 'billing_info.region'},
  {title:'Country', path: 'billing_info.country'},
  {title:'Industry', path:  'billing_info.industry'}
];

const billingDetails = [
  {title:'Credit Card', path: 'billing_info.credit_card'},
  {title:'Card expires on', path: 'billing_info.expires_on'},
  {title:'Address', path: 'billing_info.address'},
  {title:'Region', path: 'billing_info.region'},
  {title:'Country', path: 'billing_info.country'}
];

const tariffPlan = [
  {title:'Cost/User', sign:'$', path: 'cost_per_user'},
  {title:'Price/Period',sign:'$', path: 'subscription_fee'},
  {title:'Period', path: 'period'},
  {title:'Maximum users', path: 'user_amount'}
];

class PersonalCabinetBilling extends Component {

  state = {
    showCreateUserModal: false,
    showEditProfileModal: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showCreateUserModal && nextState.showCreateUserModal) {
      return false
    }
    return true;
  }

  componentWillMount (){
    getProfileWired(this.props.userReducer.user_id);
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
    this.setState({ showEditProfileModal: !this.state.showEditProfileModal })
  }

  render() {
    const {showEditProfileModal} = this.state;
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
                   alignItems='top'
                   direction='row'
                   justify='space-around'
        >
          <Grid item xs={12} sm={6} className = 'information-block'>
            <Paper className={classes.paper}>
              <div className = 'profile-paper-container'>
                <div className = 'profile-paper-sub-header'>Billing Details</div>
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
                   alignItems='top'
                   direction='row'
                   justify='space-around'
        >
          <Grid item xs={12} sm={12} className = 'information-block'>
            <Paper className={classes.paper}>
              <div className = 'profile-paper-container'>
                <div className = 'profile-paper-sub-header'>Billing History</div>
                <div className = 'profile-paper-data-container'>
                  {map(mainInformation, (el,index) => this._renderItem(el,index,profileReducer))}
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid></div>

        <Modal
          fullScreen
          open={showEditProfileModal}
          showControls={false}
          toggleModal={this._openEditModal}
          CustomContent={() => <CreateUser userData = {profileReducer} toggleModal={this._openEditModal}/>}
        />

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

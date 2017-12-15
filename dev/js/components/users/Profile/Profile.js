import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { browserHistory }       from 'react-router'
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import { withStyles }           from 'material-ui/styles';
import { get, map }                  from 'lodash'
import CommentIcon              from 'material-ui-icons/Comment';

import { PAGE } from '../../../config';

import {
  getProfileWired,
} from '../../../actions'

const styles = theme => ({
  root:{
    height:'100%',
  },
  paper:{
    margin: '10px',
    display:'flex',
    width:'100%',
  }

});

class Profile extends Component {

  componentWillMount (){
    getProfileWired(this.props.params.id);
  }
  renderItem =(el, index, profileReducer)=>{
    return (
      <div className = 'profile-paper-data' key={el.path}>
        <div className = 'profile-paper-data-title'>
          {el.title}
        </div>
        <div className = 'profile-paper-data-info'>
          {get(profileReducer, el.path,'-')}
        </div>
      </div>
    )
  }

  render() {
    const {
      classes,
      profileReducer
    } = this.props;

    const mainInformation = [
      {title:'Company / Entity Name', path: 'name'},
      {title:'EU VAT nr.', path: 'legal_info.vat'},
      {title:'Registration nr. (Non EU)', path: 'legal_info.reg_num'},
      {title:'Address', path: 'contact_info.address'},
      {title:'Region', path: 'contact_info.region'},
      {title:'Country', path: 'contact_info.country'},
      {title:'Industry', path:  'contact_info.industry'}];

    const billingAddress = [
      {title: 'Address', path: 'billing_info.address'},
      {title: 'Region', path: 'billing_info.region'},
      {title: 'Country', path: 'billing_info.country'}];

    console.log(mainInformation);
    return (
    <div className="profile-main-container">
      <div className="profile-sub-header">Companies <span>Company name</span></div>
      <Grid className={classes.root}
            container
            alignItems='top'
            direction='row'
            justify='space-around'
      >
        <Grid item xs={12} sm={7} className = 'information-block'>
          <Paper className={classes.paper}>
            <div className = 'profile-paper-container'>
              <div className = 'profile-paper-sub-header'>Information</div>
              <div className = 'profile-paper-data-container'>
                {map(mainInformation, this.renderItem)}
              </div>
              <div className="profile-paper-hr"></div>
              <div className = 'profile-paper-sub-header'>Company Users</div>
              <div className = 'profile-paper-data-container'>
                <div className = 'profile-paper-data'>
                  <div className="users-count">Users</div>
                </div>
              </div>
              <div className="profile-paper-hr"></div>
              <div className = 'profile-paper-sub-header'>Billing Address</div>
              <div className = 'profile-paper-data-container'>
                {map(billingAddress, this.renderItem(profileReducer))}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5} className = 'information-block'>
          <Paper className={classes.paper}>
            <div className = 'profile-paper-container'>
              <div className = 'profile-paper-sub-header'>Contact Persons</div>
              <div className = 'profile-paper-data-container'>
                <div className = 'profile-paper-data'>
                  <div className = 'profile-paper-data-title'>
                    Name
                  </div>
                  <div className = 'profile-paper-data-info'>
                    {(get(profileReducer, 'contact_info.name') && get(profileReducer, 'contact_info.surname'))||'-'}
                    <CommentIcon />
                  </div>
                </div>
                <div className = 'profile-paper-data'>
                  <div className = 'profile-paper-data-title'>
                    Email
                  </div>
                  <div className = 'profile-paper-data-info'>
                    {get(profileReducer, 'contact_info.email')||'-'}
                  </div>
                </div>
                <div className = 'profile-paper-data'>
                  <div className = 'profile-paper-data-title'>
                    Phone
                  </div>
                  <div className = 'profile-paper-data-info'>
                    {get(profileReducer, 'contact_info.phone')||'-'}
                  </div>
                </div>
              </div>
              <div className="profile-paper-hr"></div>
              <div className = 'profile-paper-data-container'>
                <div className = 'profile-paper-data'>
                  <div className = 'profile-paper-data-title'>
                    Name
                  </div>
                  <div className = 'profile-paper-data-info'>
                    {(get(profileReducer, 'contact_info.name_2') && get(profileReducer, 'contact_info.surname_2'))||'-'}
                    <CommentIcon />
                  </div>

                </div>
                <div className = 'profile-paper-data'>
                  <div className = 'profile-paper-data-title'>
                    Email
                  </div>
                  <div className = 'profile-paper-data-info'>
                    {get(profileReducer, 'contact_info.email_2')||'-'}
                  </div>
                </div>
                <div className = 'profile-paper-data'>
                  <div className = 'profile-paper-data-title'>
                    Phone
                  </div>
                  <div className = 'profile-paper-data-info'>
                    {get(profileReducer, 'contact_info.phone_2')||'-'}
                  </div>
                </div>
              </div>
              <div className="profile-paper-hr"></div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>

    )
  }
}

const mapStateToProps = state => ({
  profileReducer: state.profileReducer,
});

export default  connect(mapStateToProps)(withStyles(styles)(Profile));

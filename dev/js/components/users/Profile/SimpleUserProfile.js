import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { browserHistory }       from 'react-router'
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import { withStyles }           from 'material-ui/styles';
import get                      from 'lodash/get';
import map                      from 'lodash/map';
import split                    from 'lodash/split';
import pickBy                   from 'lodash/pickBy';
import replace                  from 'lodash/replace';
import Modal                    from '../../common/Modal/Modal';
import DeactivateComponent      from '../../common/Modal/DeactivateModal'
import EditSimpleUser           from '../CreateUser/EditSimpleUser';
import SelfDiagnosisQA          from '../user-modals/SelfDiagnosisQA'
import ArrowRight               from 'material-ui-icons/KeyboardArrowRight';
import EditIcon                 from 'material-ui-icons/Edit';
import { Switch }               from '../../common/index';
import {
  getProfileWired,
  activateUser,
  deleteUser,
  userUpdate,
  userUpdatePricingGroup,
  getDiagnosticByTherapyWired,
  getDiagnosticByDiagnosticIdWired,
  getPricingGroupsWired}        from '../../../actions'

import moment                   from 'moment';

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
    padding: '20px 0',
    display:'flex',
    width:'100%',
  }

});

const Id = [
  {title:'ID Number', path: 'user_id'},
];

const mainInformation = [
  {title:'First Name', path: 'first_name'},
  {title:'Last Name', path: 'last_name'},
  {title:'Email', path: 'email'},
  {title:'Country', path: 'country'},
  {title:'City', path: 'city'},
  {title:'Language', path: 'language'},
  {title:'Pricing group', path: 'pricing_group'}
];

class Profile extends Component {

  state = {
    showEditSimpleUserModal: false,
    showDeleteUserModal: false,
    showSelfDiagnosisQAModal: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showCreateUserModal && nextState.showCreateUserModal) {
      return false
    }
    return true;
  }

  componentWillMount (){
    getProfileWired(this.props.params.userId, 'users');
    getPricingGroupsWired('getPricingGroups');
    getDiagnosticByTherapyWired('getDiagnosticByTherapy' , this.props.params.userId);
  }

  _renderItem =(el, index, simpleUserProfileReducer)=>{
    return (
      <div className = 'profile-paper-data' key={el.path}>
        <div className = 'profile-paper-data-title'>
          {el.title}
        </div>
        <div className = 'profile-paper-data-info'>
          {get(simpleUserProfileReducer, el.path, '-') || '-'}
        </div>
      </div>
    )
  };

  _renderDiagnosticItem = (el, index) => {
    return (
      <div className='profile-paper-data' key={el.diagnostic_id} onClick={() => this._openSelfDiagnosisQA(el.diagnostic_id)}>
        <div className='profile-paper-data-title'>
          Diagnostic
        </div>
        <div className='profile-paper-data-info'>
          {this._formatTime(el.created_at)} / {' '}
          {el.therapy_packages.length > 0 ?
            el.therapy_packages.map(treatment => `${treatment.treatment_key} / not completed`)
            : `- / completed`
          }
        </div>
      </div>
    )
  };
  _renderSwitcher = () => {
    if(this.props.simpleUserProfileReducer.confirmed_at){
      return(
        <Switch
          label={this.props.simpleUserProfileReducer.deactivated_at ? 'Suspended':'Active'}
          checked={!this.props.simpleUserProfileReducer.deactivated_at}
          labelClassName={'switch-label'}
          onChange={this._onSwitchChange}
        />
      )
    }
    return 'Not Confirmed'
  };

  _returnFunc = () => {
    let returnUrl = split(this.props.route.path, '/:userId/', 1);
    returnUrl = replace(returnUrl[0], ':id', this.props.params.id);
    browserHistory.push(returnUrl);
  };

  _toggleEditSimpleUserModal = () => this.setState({ showEditSimpleUserModal: !this.state.showEditSimpleUserModal });

  _toggleSelfDiagnosisQAModal = () => this.setState({ showSelfDiagnosisQAModal: !this.state.showSelfDiagnosisQAModal });

  _toggleDeleteUserModal = () => this.setState({ showDeleteUserModal: !this.state.showDeleteUserModal });


 _onSwitchChange = () => {
   let action = 'deactivate';
   if(this.props.simpleUserProfileReducer.deactivated_at){
     action = 'activate';
   }
   activateUser('users', 'userProfile', [{user_id: this.props.params.userId}], action)
     .then(() => getProfileWired(this.props.params.userId, 'users'));
 };

  _formatTime = (data) => {
    return data ? moment.unix(data).format('DD MMM YYYY') : '-'
  };

  _deleteUser = ()=>{
    let returnUrl = split(this.props.route.path, '/:userId/', 1);
    returnUrl = replace(returnUrl[0], ':id', this.props.params.id);
    deleteUser('users', 'userProfile', [{user_id: this.props.params.userId}])
      .then(() => browserHistory.push(returnUrl));
  };

  _editSimpleUser= ()=>{
    const key = get(this.props, 'simpleUserProfileReducer.pricing_group');
    const result = pickBy(this.props.simpleUserProfileReducer, function(value, key) {
      return value ? value : '';
    });
    userUpdate('users', 'userProfile', this.props.params.userId, result)
      .then(()=>{
      userUpdatePricingGroup('users', 'updateUserPricingGroup', this.props.params.userId, {key})
        .then(() => this._toggleEditSimpleUserModal());
    });
  };

  _openSelfDiagnosisQA = (diagnosticId) =>{
    const answers = getDiagnosticByDiagnosticIdWired(diagnosticId);
    this._toggleSelfDiagnosisQAModal();
  };

  render() {
    const diagnosticList = get(this.props,'simpleUserProfileReducer.data') || [];
    const { showEditSimpleUserModal, showDeleteUserModal, showSelfDiagnosisQAModal } = this.state;
    const {
      classes,
      simpleUserProfileReducer
    } = this.props;

    return (
    <div className="profile-main-container">
      <div className="profile-sub-header">
        <span className="profile-total" onClick={this._returnFunc}> Users </span>
        <ArrowRight className="arrow-right-icon" />
        <span className="profile-name"> User Profile </span>

      </div>
      <Grid className={classes.root}
            container
            direction='row'
            justify='space-around'
            alignItems='flex-start'
      >
        <Grid item xs={12} sm={6} className = 'information-block'>
          <Paper className={classes.paper}>
            <div className = 'profile-paper-container'>

              <div className = 'profile-paper-data-container'>
                {map(Id, (el,index) => this._renderItem(el,index,simpleUserProfileReducer))}
              </div>
              <div className="profile-paper-hr"/>

              <div className = 'profile-paper-data-container'>
                <div className = 'profile-paper-data'>
                  <div className = 'profile-paper-data-title-status'>
                    Status
                  </div>
                  <div className = 'profile-paper-data-info'>
                    {this._renderSwitcher()}
                  </div>
                </div>
              </div>
              <div className="profile-paper-hr"/>

              <div className = 'profile-paper-sub-header'>User Information
                <EditIcon onClick={this._toggleEditSimpleUserModal} /> </div>
              <div className = 'profile-paper-data-container'>
                {map(mainInformation, (el,index) => this._renderItem(el,index,simpleUserProfileReducer))}
              </div>
              <div className="profile-paper-hr"/>

              <div className = 'profile-paper-data-container'>
                <div className = 'profile-paper-data'>
                  <div className = 'profile-paper-data-title'>
                    Activated at
                  </div>
                  <div className = 'profile-paper-data-info'>
                    {this._formatTime(get(simpleUserProfileReducer, 'activated_at','-'))}
                  </div>
                </div>
              </div>

              <div className="profile-paper-hr"/>

              <div className = 'profile-paper-data-container'>
                <div className = 'profile-paper-data'>
                  <div className="users-count" onClick={this._toggleDeleteUserModal}> DELETE USER</div>
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} className = 'information-block'>
          {diagnosticList.length>0?
            (<Paper className={classes.paper}>
              <div className = 'profile-paper-container'>
                <div className = 'profile-paper-data-container'>
                  {map(diagnosticList, (el,index) => this._renderDiagnosticItem(el,index))}
                </div>
                <div className="profile-paper-hr"/>
              </div>
            </Paper>):''
          }
        </Grid>
      </Grid>

      <DeactivateComponent
        pathReq="createQuestion"
        path="users"
        domen="diagnostics"
        typeKey="deactivateOpen"
        list={[this.props.simpleUserProfileReducer]}
        title="Delete user?"
        deactivateOpen={showDeleteUserModal}
        open={()=>this._toggleDeleteUserModal()}
        itemKey="email"
        query={this.props.location.query}
        onSubmit={this._deleteUser}
        onSubmitTitle="Delete"
      />

      <Modal
        itemName="name_real"
        open={showEditSimpleUserModal}
        title='User Information'
        toggleModal={this._toggleEditSimpleUserModal}
        onConfirmClick={() => this._editSimpleUser()}
        CustomContent={() => <EditSimpleUser />}
      />

      <SelfDiagnosisQA
        deactivateOpen={showSelfDiagnosisQAModal}
        open={this._toggleSelfDiagnosisQAModal}
        itemKey="user_id"
      />

    </div>

    )
  }
}

const mapStateToProps = state => ({
  createSimpleUsersReducers: state.createSimpleUsersReducers,
  userReducer:state.userReducer,
  simpleUserProfileReducer: state.simpleUserProfileReducer,
});

export default  connect(mapStateToProps)(withStyles(styles)(Profile));

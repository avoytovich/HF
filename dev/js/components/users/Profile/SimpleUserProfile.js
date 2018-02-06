import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { browserHistory }       from 'react-router'
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import { withStyles }           from 'material-ui/styles';
import  get                     from 'lodash/get';
import  map                     from 'lodash/map'
import Modal                    from '../../common/Modal/Modal';
import DeactivateComponent      from '../../common/Modal/DeactivateModal'
import EditSimpleUser           from '../CreateUser/EditSimpleUser';
import ArrowRight               from 'material-ui-icons/KeyboardArrowRight';
import EditIcon                 from 'material-ui-icons/Edit';
import { Switch }               from '../../common/index';
import {
  getProfileWired,
  activateUser,
  deleteUser} from '../../../actions'

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
    display:'flex',
    width:'100%',
  }

});

const Id = [
  {title:'ID Number', path: 'user_id'},
];

const mainInformation = [
  {title:'First Name', path: 'name'},
  {title:'Last Name', path: 'surname'},
  {title:'Email', path: 'email'},
  {title:'Country', path: 'country'},
  {title:'City', path: 'city'},
  {title:'Language', path: 'language'}
];

class Profile extends Component {

  state = {
    showEditSimpleUserModal: false,
    showDeleteUserModal: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showCreateUserModal && nextState.showCreateUserModal) {
      return false
    }
    return true;
  }

  componentWillMount (){
    getProfileWired(this.props.params.id, 'users');
  }

  _renderItem =(el, index, profileReducer)=>{
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
  };

  _renderSwitcher = () => {
    if(this.props.profileReducer.confirmed_at){
      return(<Switch label={this.props.profileReducer.deactivated_at ? 'Suspended':'Active'}
                     checked={!this.props.profileReducer.deactivated_at}
                     labelClassName={'switch-label'}
                     onChange={this._onSwitchChange}/>)
    }
    return 'Not Confirmed'
  };

  _returnFunc = () => {
    browserHistory.push('/personal-cabinet/users');
  };

  _toggleEditSimpleUserModal = () => this.setState({ showEditSimpleUserModal: !this.state.showEditSimpleUserModal });


  _toggleDeleteUserModal = () => this.setState({ showDeleteUserModal: !this.state.showDeleteUserModal });


 _onSwitchChange = () => {
   let action = 'deactivate';
   if(this.props.profileReducer.deactivated_at){
     action = 'activate';
   }
  console.log(action);
   activateUser('users', 'userProfile', [{user_id: this.props.params.id}], action)
     .then(() => getProfileWired(this.props.params.id, 'users'));
 };

  _formatTime = (data) => {
    return moment.unix(data).format('DD MMM YYYY')
  };

  _deleteUser = ()=>{
    console.log('delete!!!');
    deleteUser('users', 'userProfile', [{user_id: this.props.params.id}])
      .then(() => browserHistory.push('/personal-cabinet/users'));
  };

  _editSimpleUser= ()=>{
    console.log('E D I T!!!');
  };

  render() {
    console.log(this.props);
    const {showEditSimpleUserModal, showDeleteUserModal} = this.state;
    const {
      classes,
      profileReducer
    } = this.props;

    return (
    <div className="profile-main-container">
      <div className="profile-sub-header">
        <span className="profile-total" onClick={this._returnFunc}> Users </span>
        <ArrowRight className="arrow-right-icon" />
        <span className="profile-name"> User Profile </span>

        {/*<Button raised className={classes.button} onClick={this._openEditModal}>*/}
          {/*<EditIcon /> Edit*/}
        {/*</Button>*/}

      </div>
      <Grid className={classes.root}
            container
            direction='row'
            justify='space-around'
      >
        <Grid item xs={12} sm={6} className = 'information-block'>
          <Paper className={classes.paper}>
            <div className = 'profile-paper-container'>

              <div className = 'profile-paper-data-container'>
                {map(Id, (el,index) => this._renderItem(el,index,profileReducer))}
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
                {map(mainInformation, (el,index) => this._renderItem(el,index,profileReducer))}
              </div>
              <div className="profile-paper-hr"/>

              <div className = 'profile-paper-data-container'>
                <div className = 'profile-paper-data'>
                  <div className = 'profile-paper-data-title'>
                    Activated at
                  </div>
                  <div className = 'profile-paper-data-info'>
                    {this._formatTime(get(profileReducer, 'activated_at','-'))}
                  </div>
                </div>
              </div>

              <div className="profile-paper-hr"/>

              <div className = 'profile-paper-data-container'>
                <div className = 'profile-paper-data'>
                  <div className="users-count" onClick={this._toggleDeleteUserModal}> DELETE USER</div>
                </div>
              </div>
              <div className="profile-paper-hr"/>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} className = 'information-block'>

        </Grid>
      </Grid>

      <DeactivateComponent
        pathReq="createQuestion"
        path="users"
        domen="diagnostics"
        typeKey="deactivateOpen"
        list={[this.props.profileReducer]}
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

    </div>

    )
  }
}

const mapStateToProps = state => ({
  profileReducer: state.profileReducer,
  createSimpleUsersReducers: state.createSimpleUsersReducers,
  userReducer:state.userReducer
});

export default  connect(mapStateToProps)(withStyles(styles)(Profile));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import get from 'lodash/get';
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import CommentIcon from 'material-ui-icons/Comment';
import Modal from '../../common/Modal/Modal';
import CreateSimpleUser from '../CreateUser/CreateSimpleUser';
import ArrowRight from 'material-ui-icons/KeyboardArrowRight';
import EditIcon from 'material-ui-icons/Edit';
import Button from 'material-ui/Button';
import CreateUser from '../CreateUser/CreateUser';
import {
  userCreate,
  userCreateByCSV,
  getProfileWired,
  dispatchCreateSimpleUserPayloadWired
} from '../../../actions'

const styles = theme => ({
  root: {
    height: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  paper: {
    margin: '10px',
    display: 'flex',
    width: '100%',
  }

});

const mainInformation = [
  { title: 'Company / Entity Name', path: 'name' },
  { title: 'EU VAT nr.', path: 'legal_info.vat' },
  { title: 'Registration nr. (Non EU)', path: 'legal_info.reg_num' },
  { title: 'Address', path: 'contact_info.address' },
  { title: 'Region', path: 'contact_info.region' },
  { title: 'Country', path: 'contact_info.country' },
  { title: 'Postal Code', path: 'contact_info.postal_code' },
  { title: 'Industry', path: 'additional_info.industry' },
  { title: 'Tariff Plan', path: 'additional_info.tariff' }
];

const billingAddress = [
  { title: 'Address', path: 'billing_info.address' },
  { title: 'Region', path: 'billing_info.region' },
  { title: 'Country', path: 'billing_info.country' },
  { title: 'Postal code', path: 'billing_info.postal_code' }
];

class Profile extends Component {

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

  componentWillMount() {
    getProfileWired(this.props.params.id, 'customers');
  }

  _getUsers = () => {
    const currentId = this.props.params.id;

    if (get(this.props, 'profileReducer.type') === 'organization') {
      browserHistory.push(`/company/${currentId}/users`);
    }
    else if (get(this.props, 'profileReducer.type') === 'clinic') {
      browserHistory.push(`/clinic/${currentId}/users`);
    }

  }

  _renderItem = (el, index, profileReducer) => {
    return (
      <div className='profile-paper-data' key={el.path}>
        <div className='profile-paper-data-title'>
          {el.title}
        </div>
        <div className='profile-paper-data-info'>
          {get(profileReducer, el.path, '-')}
        </div>
      </div>
    )
  };

  _returnFunc = () => {
    if (get(this.props, 'profileReducer.type') === 'organization') {
      browserHistory.push('/companies');
    }
    else if (get(this.props, 'profileReducer.type') === 'clinic') {
      browserHistory.push('/clinics');
    }
  };

  _renderContact = (el, index) => {
    return (
      <div key={index}>
        <div className='profile-paper-data-container'>
          <div className='profile-paper-data'>
            <div className='profile-paper-data-title'>
              Name
        </div>
            <div className='profile-paper-data-info'>
              {el.name + ' ' + el.surname}
              <CommentIcon />
            </div>
          </div>
          <div className='profile-paper-data'>
            <div className='profile-paper-data-title'>
              Email
        </div>
            <div className='profile-paper-data-info'>
              {el.email}
            </div>
          </div>
          <div className='profile-paper-data'>
            <div className='profile-paper-data-title'>
              Phone
        </div>
            <div className='profile-paper-data-info'>
              {el.phone}
            </div>
          </div>
        </div>
        <div className="profile-paper-hr" />
      </div>
    )
  };
  _addUsers = () => {
    this.setState({ showCreateUserModal: !this.state.showCreateUserModal });
  };

  _createSimpleUser = () => {
    const result = {
      customer_id: this.props.params.id,
      email: this.props.createSimpleUsersReducers.email,
    };

    userCreate('users', 'createSimpleUser', result)
      .then(() => {
        this.setState({ showCreateUserModal: false });
        dispatchCreateSimpleUserPayloadWired({ email: '' });
        getProfileWired(this.props.params.id, 'customers');
      })

  };

  _toggleCloseModal = () => this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  _openEditModal = () => {
    this.setState({ showEditProfileModal: !this.state.showEditProfileModal })
  };

  render() {
    const { showCreateUserModal, showEditProfileModal } = this.state;
    const {
      classes,
      profileReducer
    } = this.props;

    return (
      <div className="profile-main-container">
        <div className="profile-sub-header">
          <span className="profile-total" onClick={this._returnFunc}> {get(this.props, 'profileReducer.type') === 'clinic' ? 'Clinics ' : 'Companies '}</span>
          <ArrowRight className="arrow-right-icon" />
          <span className="profile-name">{get(profileReducer, 'name')} Profile </span>
          <Button raised className={classes.button} onClick={this._openEditModal}>
            <EditIcon /> Edit
        </Button>
        </div>
        <Grid className={classes.root}
          container
          direction='row'
          justify='space-around'
        >
          <Grid item xs={12} sm={7} className='information-block'>
            <Paper className={classes.paper}>
              <div className='profile-paper-container'>
                <div className='profile-paper-sub-header'>Information</div>
                <div className='profile-paper-data-container'>
                  {map(mainInformation, (el, index) => this._renderItem(el, index, profileReducer))}
                </div>
                <div className="profile-paper-hr" />
                <div className='profile-paper-sub-header'>Company Users</div>
                <div className='profile-paper-data-container'>
                  <div className='profile-paper-data'>
                    <div className="users-count" onClick={this._getUsers}> {get(profileReducer, 'users') + (get(profileReducer, 'users') > 1 ? ' Users' : ' User')}</div>
                    <div className="add-user" onClick={this._addUsers}><span>+</span> ADD USER</div>
                  </div>
                </div>
                <div className="profile-paper-hr" />
                <div className='profile-paper-sub-header'>Billing Address</div>
                <div className='profile-paper-data-container'>
                  {map(billingAddress, (el, index) => this._renderItem(el, index, profileReducer))}
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5} className='information-block'>
            <Paper className={classes.paper}>
              <div className='profile-paper-container'>
                <div className='profile-paper-sub-header'>Contact Persons</div>
                {map(get(profileReducer, 'contact_info.contacts'), (el, index) => this._renderContact(el, index))}
              </div>
            </Paper>
          </Grid>
        </Grid>

        <Modal
          itemName="name_real"
          open={showCreateUserModal}
          title='Add user'
          toggleModal={this._toggleCloseModal}
          onConfirmClick={() => this._createSimpleUser()}
          CustomContent={() => <CreateSimpleUser />}
        />

        <Modal
          fullScreen
          open={showEditProfileModal}
          showControls={false}
          toggleModal={this._openEditModal}
          CustomContent={() => <CreateUser userData={profileReducer} toggleModal={this._openEditModal} />}
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

export default connect(mapStateToProps)(withStyles(styles)(Profile));

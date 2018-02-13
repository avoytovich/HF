import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import { withStyles }           from 'material-ui/styles';
import { TARIFF_PLANS }            from '../../utils/constants/pageContent';
import TableControls            from '../common/TypicalListPage/TableControls';
import { TableComponent }       from '../../components/common/TypicalListPage';
import get                      from 'lodash/get';
import map                      from 'lodash/map';
import {domen, api}             from '../../config';
import Button                   from 'material-ui/Button';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeleteIcon               from 'material-ui-icons/Delete';
import DeactivateComponent      from '../users/user-modals/deactivateModal';
import DeleteComponent          from '../users/user-modals/deleteModal';
import CreateTariffPlan         from './tariff-modals/CreateTariffPlan';
import Modal                    from '../common/Modal/Modal';
import { getProfileWired,
  userCreate,
  dispatchCreateSimpleUserPayloadWired }           from '../../actions'

const styles = theme => ({
  root:{
    height:'100%',
  },
  button: {
    margin: theme.spacing.unit,
    float : 'right',
  },
  paper:{
    margin: '10px 0',
    width:'100%',
  }

});

class PersonalCabinetBilling extends Component {

  state = {
    selected: [],
    showCreateUserModal:false,
    showActivateModal:false,
    showDeactivateModal:false,
    showDeleteModal:false,
    showCSVUploadModal: false
  };


  componentWillMount (){
    getProfileWired(this.props.userReducer.user_id,'customers');
  }

  _tableCellPropsFunc = (row, col) => {
    if (col.key === 'user_id') {
      return {
        onClick: (e) => {
          e.stopPropagation();
          browserHistory.push(`${this.props.location.pathname}/${row.user_id}/profile`);
        }
      }
    }
    return {};
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});

  createEntity = () => this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  _toggleDeleteModal = () => this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _createSimpleUser =() =>{
    let location = get(this.props,'location.search');
    const result = {
      customer_id: this.props.params.id,
      email: this.props.createSimpleUsersReducers.email,
    };

    userCreate('users', 'usersSimple', this.props.createSimpleUsersReducers)
      .then(()=>{
        this.setState({showCreateUserModal:false});
        dispatchCreateSimpleUserPayloadWired({errors: {}, email: "", customer_id: '', active: false,
          role:'', first_name:'', last_name:'',});
        browserHistory.push(`/users-simple/${location}`);
      });
  };

  render() {
    const {
      classes
    } = this.props;

    const { tableHeader } = TARIFF_PLANS;
    const { selected, showActivateModal, showDeactivateModal, showDeleteModal, showCreateUserModal, showCSVUploadModal } = this.state;
    const querySelector = {...this.props.location.query,...{customer_type: 'simple'}};
    const url = `${domen['users']}${api['simpleUsers']}`;

    return (
      <div className="profile-main-container">
        <div className="profile-sub-header">
          <span className="profile-name">Tariff Plans</span>
        </div>
        <div>
          <Grid item xs={12} sm={12} className = 'information-block'>
            <Paper className={classes.paper}>
              <div className = 'profile-paper-container'>
                <div className = 'profile-paper-data-container'>
                  <div className = 'tariff-plan-paper-data'>
                    <div className = 'tariff-plan-data-info tariff-plan-additional-info'>
                      Simple
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      Price
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      Period
                    </div>
                  </div>

                  <div className = 'profile-paper-data'>
                    <div className = 'tariff-plan-paper-data-title tariff-plan-data-info'>
                      Heal Users
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      $ 99
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      Monthly
                    </div>
                  </div>

                </div>

                <div className="profile-paper-hr"/>
                <div className = 'profile-paper-data-container'>
                  <div className="tariff-plan-additional-info">
                    * Simple tariff plan for Heal users ( App Store & Google Play uploaded )
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </div>

        <div id="diagnosis-component">

          <Grid item xs={12} sm={12} className = 'information-block'>
            <Paper className={classes.paper}>
          <TableControls
            locationUrl={this.props.location.pathname}
            path="users"
            selected={selected}
            createItem={this.createEntity}
            createButtonText="Add"
            searchKey = "filter"
          >

            {/*<Button raised dense*/}
                    {/*onClick={() => this.updateModal('showActivateModal', true)}>*/}
              {/*<ActivateIcon/>Activate*/}
            {/*</Button>*/}
            {/*<Button raised dense*/}
                    {/*onClick={() => this.updateModal('showDeactivateModal', true)}>*/}
              {/*<DeactivateIcon/> Deactivate*/}
            {/*</Button>*/}

            <Button raised dense
                    onClick={() => this.updateModal('showDeleteModal', true)}>
              <DeleteIcon/> Delete
            </Button>

          </TableControls>

          <TableComponent
            location={this.props.location}
            path="simpleUsers"
            domen="users"
            reqType="POST"
            tableHeader={ tableHeader }
            selected={selected}
            onRowClick={this.onRowClick}
            onSelectAllClick={this.onSelectAllClick}
            query= {querySelector}
            tableCellPropsFunc={this._tableCellPropsFunc}
          />

          <DeactivateComponent
            pathReq="userProfile"
            path="simpleUsers"
            domen="users"
            url={url}
            typeKey="deactivateOpen"
            list={selected}
            title="Activate this Users"
            deactivateOpen={showActivateModal}
            open={()=>this.updateModal('showActivateModal', false)}
            itemKey="user_id"
            query={querySelector}
            action="activate"
            onSubmitTitle = "Activate"
          />

          <DeactivateComponent
            pathReq="userProfile"
            path="simpleUsers"
            domen="users"
            url={url}
            typeKey="deactivateOpen"
            list={selected}
            title="Deactivate this Users"
            deactivateOpen={showDeactivateModal}
            open={()=>this.updateModal('showDeactivateModal', false)}
            itemKey="user_id"
            query={querySelector}
            action="deactivate"
            onSubmitTitle = "Deactivate"
          />

          <DeleteComponent
            pathReq="userProfile"
            path="simpleUsers"
            domen = "users"
            url={url}
            typeKey="deactivateOpen"
            list={selected}
            title="Delete this Users?"
            deactivateOpen={showDeleteModal}
            open={()=>this.updateModal('showDeleteModal', false)}
            itemKey="user_id"
            query={querySelector}
          />

          <Modal
            itemName="name_real"
            open={showCreateUserModal}
            title='Tariff Plan'
            toggleModal={this._toggleDeleteModal}
            onConfirmClick={() => this._createSimpleUser()}
            CustomContent={() => <CreateTariffPlan />}
          />
            </Paper>
          </Grid>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profileReducer: state.profileReducer,
  userReducer: state.userReducer,
  store: state.tables.diagnosis,
  createSimpleUsersReducers: state.createSimpleUsersReducers,
  CSVFileReducer :state.CSVFileReducer,
});

export default  connect(mapStateToProps)(withStyles(styles)(PersonalCabinetBilling));

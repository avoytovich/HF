import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { browserHistory }       from 'react-router'
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import { withStyles }           from 'material-ui/styles';
import { TARIFF_PLANS }            from '../../utils/constants/pageContent';
import TableControls            from '../common/TypicalListPage/TableControls';
import { TableComponent }       from '../../components/common/TypicalListPage';
import get                      from 'lodash/get';
import {domen, api}             from '../../config';
import Button                   from 'material-ui/Button';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeleteIcon               from 'material-ui-icons/Delete';
import EditIcon                 from 'material-ui-icons/Edit';
import DeactivateComponent      from '../users/user-modals/deactivateModal';
import DeleteComponent          from '../users/user-modals/deleteModal';
import CreateTariffPlan         from './tariff-modals/CreateTariffPlan';
import EditSimpleTariffPlan         from './tariff-modals/EditSimpleTariffPlan';
import Modal                    from '../common/Modal/Modal';
import { getTariffPlansWired,
  tariffPlanCreate,
  tariffPlanUpdate,
  dispatchTariffPlansPayloadWired }           from '../../actions'

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
    showCreateTariffPlanModal:false,
    showActivateModal:false,
    showDeactivateModal:false,
    showDeleteModal:false,
    showEditSimpleTariff:false,
  };

  componentWillMount (){
    getTariffPlansWired('getSimpleTariff');
  }

  _tableCellPropsFunc = (row, col) => {
    if (col.key === 'name') {
      return {
        onClick: (e) => {
          e.stopPropagation();
          dispatchTariffPlansPayloadWired(row);
          this.updateModal('showCreateTariffPlanModal', true);
        }
      }
    }
    return {};
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});

  createEntity = () => this.setState({ showCreateTariffPlanModal: !this.state.showCreateTariffPlanModal });

  _toggleDeleteModal = () => this.setState({ showCreateTariffPlanModal: !this.state.showCreateTariffPlanModal });

  _toggleEditSimpleTariff = () => this.setState({ showEditSimpleTariff: !this.state.showEditSimpleTariff });

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _editSimpleTariff = () =>{
    let location = get(this.props,'location.search');
    const result = {
      ...this.props.simpleTariffPlanReducer,...{tariff_type:this.props.simpleTariffPlanReducer.customer_type,
        subscription_fee: +this.props.simpleTariffPlanReducer.subscription_fee,
        cost_per_user: +this.props.simpleTariffPlanReducer.cost_per_user},
    };

    tariffPlanUpdate('users', 'createTariff',result, get(this.props,'simpleTariffPlanReducer.id') )
      .then(()=>{
        this.setState({showEditSimpleTariff:false});
        dispatchTariffPlansPayloadWired ({errors: {},
          name: '',
          customer_type: '',
          tariff_type: '',
          subscription_fee: '',
          cost_per_user:'',
          period:'',});
        browserHistory.push(`/tariff-plans/${location}`);
      });
  };

  _createTariffPlan =() =>{
    let location = get(this.props,'location.search');
    const result = {
      ...this.props.createTariffPlanReducer,...{tariff_type:this.props.createTariffPlanReducer.customer_type,
        subscription_fee: +this.props.createTariffPlanReducer.subscription_fee,
        cost_per_user: +this.props.createTariffPlanReducer.cost_per_user},
    };

    if (get(this.props,'createTariffPlanReducer.id')){
      tariffPlanUpdate('users', 'createTariff',result, get(this.props,'createTariffPlanReducer.id') )
        .then(()=>{
          this.setState({showCreateTariffPlanModal:false});
          dispatchTariffPlansPayloadWired ({errors: {},
            name: '',
            customer_type: '',
            tariff_type: '',
            subscription_fee: '',
            cost_per_user:'',
            period:'',});
          browserHistory.push(`/tariff-plans/${location}`);
        });
    }
    else{
      tariffPlanCreate('users', 'createTariff',result)
        .then(()=>{
          this.setState({showCreateTariffPlanModal:false});
          dispatchTariffPlansPayloadWired ({errors: {},
            name: '',
            customer_type: '',
            tariff_type: '',
            subscription_fee: '',
            cost_per_user:'',
            period:'',});
          browserHistory.push(`/tariff-plans/${location}`);
        });
    }


  };

  render() {
    const {
      classes, simpleTariffPlanReducer
    } = this.props;

    const { tableHeader } = TARIFF_PLANS;
    const { selected, showActivateModal, showDeactivateModal, showDeleteModal, showCreateTariffPlanModal,
      showEditSimpleTariff} = this.state;
    const querySelector = {...this.props.location.query};
    const url = `${domen['users']}${api['tariffPlans']}`;

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
                    <EditIcon onClick = {()=>this.updateModal('showEditSimpleTariff', true)}/>
                  </div>

                  <div className = 'profile-paper-data'>
                    <div className = 'tariff-plan-paper-data-title tariff-plan-data-info'>
                      {get(simpleTariffPlanReducer,'name')}
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      $  {get(simpleTariffPlanReducer,'cost_per_user')}
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      {get(simpleTariffPlanReducer,'period')}
                    </div>
                    <div/>
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
            path="tariffPlans"
            selected={selected}
            createItem={this.createEntity}
            createButtonText="Add"
          >

            <Button raised dense
                    onClick={() => this.updateModal('showActivateModal', true)}>
              <ActivateIcon/>Activate
            </Button>
            <Button raised dense
                    onClick={() => this.updateModal('showDeactivateModal', true)}>
              <DeactivateIcon/> Deactivate
            </Button>

            <Button raised dense
                    onClick={() => this.updateModal('showDeleteModal', true)}>
              <DeleteIcon/> Delete
            </Button>

          </TableControls>

          <TableComponent
            location={this.props.location}
            path="tariffPlans"
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
            pathReq="createTariff"
            path="tariffPlans"
            domen="users"
            url={url}
            typeKey="deactivateOpen"
            list={selected}
            title="Activate this Tariff Plans"
            deactivateOpen={showActivateModal}
            open={()=>this.updateModal('showActivateModal', false)}
            itemKey="name"
            query={querySelector}
            action="activate"
            onSubmitTitle = "Activate"
          />

          <DeactivateComponent
            pathReq="createTariff"
            path="tariffPlans"
            domen="users"
            url={url}
            typeKey="deactivateOpen"
            list={selected}
            title="Deactivate this Tariff Plans"
            deactivateOpen={showDeactivateModal}
            open={()=>this.updateModal('showDeactivateModal', false)}
            itemKey="name"
            query={querySelector}
            action="deactivate"
            onSubmitTitle = "Deactivate"
          />

          <DeleteComponent
            pathReq="createTariff"
            path="tariffPlans"
            domen = "users"
            url={url}
            typeKey="deactivateOpen"
            list={selected}
            title="Delete this Tariff Plans?"
            deactivateOpen={showDeleteModal}
            open={()=>this.updateModal('showDeleteModal', false)}
            itemKey="name"
            query={querySelector}
          />

          <Modal
            itemName="name_real"
            open={showCreateTariffPlanModal}
            title='Tariff Plan'
            toggleModal={this._toggleDeleteModal}
            onConfirmClick={() => this._createTariffPlan()}
            CustomContent={() => <CreateTariffPlan />}
          />

              <Modal
                itemName="name_real"
                open={showEditSimpleTariff}
                title='Tariff Plan'
                toggleModal={this._toggleEditSimpleTariff}
                onConfirmClick={() => this._editSimpleTariff()}
                CustomContent={() => <EditSimpleTariffPlan />}
              />
            </Paper>
          </Grid>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  createTariffPlanReducer: state.createTariffPlanReducer,
  simpleTariffPlanReducer: state.simpleTariffPlanReducer,
});

export default  connect(mapStateToProps)(withStyles(styles)(PersonalCabinetBilling));

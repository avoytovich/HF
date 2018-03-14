import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { browserHistory }       from 'react-router'
import { withStyles }           from 'material-ui/styles';
import { PRICING_GROUPS }       from '../../utils/constants/pageContent';
import TableControls            from '../common/TypicalListPage/TableControls';
import { TableComponent }       from '../../components/common/TypicalListPage';
import get                      from 'lodash/get';
import parseInt                 from 'lodash/parseInt';
import {domen, api}             from '../../config';
import DeactivateComponent      from '../users/user-modals/deactivateModal';
import DeleteComponent          from '../users/user-modals/deleteModal';
import CreatePricingGroup       from './tariff-modals/CreatePricingGroup';
import Modal                    from '../common/Modal/Modal';
import {dispatchTariffPlansPayloadWired,
  tariffPlanCreate,
  tariffPlanUpdate,}            from '../../actions'

//UI
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import Button                   from 'material-ui/Button';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeleteIcon               from 'material-ui-icons/Delete';

const defaultTariffPlanData = {
  errors: {},
  name: '',
  customer_type: '',
  tariff_type: '',
  subscription_fee: '',
  cost_per_user:'',
  period:'',
  properties: {
    free_period:''
  }
};

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
    showDeleteModal:false
  };

  _tableCellPropsFunc = (row, col) => {
    if (col.key === 'title') {
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

  _toggleDeleteModal = () => {
    this.setState({ showCreateTariffPlanModal: !this.state.showCreateTariffPlanModal });
    dispatchTariffPlansPayloadWired (defaultTariffPlanData);
  };

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _createTariffPlan =() =>{
    let location = get(this.props,'location.search');
    const free_period = parseInt(this.props.createTariffPlanReducer.properties.free_period)+ ' days';
    const result = {
      ...this.props.createTariffPlanReducer,...{tariff_type:this.props.createTariffPlanReducer.customer_type,
        subscription_fee: +this.props.createTariffPlanReducer.subscription_fee,
        cost_per_user: +this.props.createTariffPlanReducer.cost_per_user},
        properties: {
        free_period
      }
    };

    if (get(this.props,'createTariffPlanReducer.id')){
      tariffPlanUpdate('users', 'createGroup',result, get(this.props,'createTariffPlanReducer.id') )
        .then(()=>{
          this.setState({showCreateTariffPlanModal:false});
          dispatchTariffPlansPayloadWired (defaultTariffPlanData);
          browserHistory.push(`/tariff-plans/${location}`);
        });
    }
    else{
      tariffPlanCreate('users', 'createGroup',result)
        .then(()=>{
          this.setState({showCreateTariffPlanModal:false});
          dispatchTariffPlansPayloadWired (defaultTariffPlanData);
          browserHistory.push(`/tariff-plans/${location}`);
        });
    }
  };

  render() {
    const {
      classes
    } = this.props;

    const { tableHeader } = PRICING_GROUPS;
    const { selected,
      showActivateModal,
      showDeactivateModal,
      showDeleteModal,
      showCreateTariffPlanModal
    } = this.state;
    const querySelector = {...this.props.location.query};
    const url = `${domen['users']}${api['pricingGroups']}`;

    return (
      <div className="profile-main-container">
        <div className="profile-sub-header">
          <span className="profile-name">Pricing Groups</span>
        </div>
        <div id="diagnosis-component">

          <Grid item xs={12} sm={12} className = 'information-block'>
            <Paper className={classes.paper}>
          <TableControls
            locationUrl={this.props.location.pathname}
            path="pricingGroups"
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
            path="pricingGroups"
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
            pathReq="createGroup"
            path="pricingGroups"
            domen="users"
            url={url}
            typeKey="deactivateOpen"
            list={selected}
            title="Activate this Pricing Groups"
            deactivateOpen={showActivateModal}
            open={()=>this.updateModal('showActivateModal', false)}
            itemKey="title"
            query={querySelector}
            action="activate"
            onSubmitTitle = "Activate"
          />

          <DeactivateComponent
            pathReq="createGroup"
            path="pricingGroups"
            domen="users"
            url={url}
            typeKey="deactivateOpen"
            list={selected}
            title="Deactivate this Pricing Groups"
            deactivateOpen={showDeactivateModal}
            open={()=>this.updateModal('showDeactivateModal', false)}
            itemKey="title"
            query={querySelector}
            action="deactivate"
            onSubmitTitle = "Deactivate"
          />

          <DeleteComponent
            pathReq="createGroup"
            path="pricingGroups"
            domen = "users"
            url={url}
            typeKey="deactivateOpen"
            list={selected}
            title="Delete this Pricing Groups?"
            deactivateOpen={showDeleteModal}
            open={()=>this.updateModal('showDeleteModal', false)}
            itemKey="title"
            query={querySelector}
          />

          <Modal
            itemName="name_real"
            open={showCreateTariffPlanModal}
            title='Pricing Group'
            toggleModal={this._toggleDeleteModal}
            onConfirmClick={() => this._createTariffPlan()}
            CustomContent={() => <CreatePricingGroup />}
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

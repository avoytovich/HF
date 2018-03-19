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
import {dispatchPricingGroupsPayloadWired,
  pricingGroupCreate}            from '../../actions'

//UI
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import Button                   from 'material-ui/Button';
import ActivateIcon             from 'material-ui-icons/Check';
import DeactivateIcon           from 'material-ui-icons/NotInterested';
import DeleteIcon               from 'material-ui-icons/Delete';

const defaultPricingGroupData = {
  errors  : {},
  title   :'',
  key     :'',
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

class PricingGroups extends Component {

  state = {
    selected: [],
    showCreateTariffPlanModal:false,
    showActivateModal:false,
    showDeactivateModal:false,
    showDeleteModal:false
  };

  _tableCellPropsFunc = (row, col) => {
    return {};
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});

  createEntity = () => this.setState({ showCreateTariffPlanModal: !this.state.showCreateTariffPlanModal });

  _toggleDeleteModal = () => {
    this.setState({ showCreateTariffPlanModal: !this.state.showCreateTariffPlanModal });
    dispatchPricingGroupsPayloadWired (defaultPricingGroupData);
  };

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  _createPricingGroup =() =>{
    let location = get(this.props,'location.search');
    const result = this.props.createPricingGroupReducer;

    pricingGroupCreate('users', 'createGroup', result)
      .then(()=>{
        this.setState({showCreateTariffPlanModal:false});
        dispatchPricingGroupsPayloadWired (defaultPricingGroupData);
        browserHistory.push(`/tariffs/pricing-groups${location}`);
      });

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
            onConfirmClick={this._createPricingGroup}
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
  createPricingGroupReducer: state.createPricingGroupReducer
});

export default  connect(mapStateToProps)(withStyles(styles)(PricingGroups));

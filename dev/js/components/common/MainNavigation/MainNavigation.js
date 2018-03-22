import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

// UI
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Person from 'material-ui-icons/Person'; // Users
import Domain from 'material-ui-icons/Domain'; // Companies
import TariffPlan from 'material-ui-icons/AttachMoney'; // Tariff plans
import InsertDriveFile from 'material-ui-icons/InsertDriveFile'; // assets
import LocalHospital from 'material-ui-icons/LocalHospital'; // Clinics
import SettingsApplications from 'material-ui-icons/SettingsApplications'; // matrix
import Chat from 'material-ui-icons/Chat'; // matrix
import PermDeviceInformation from 'material-ui-icons/PermDeviceInformation'; // matrix
import Accessibility from 'material-ui-icons/Accessibility'; // matrix

import { PAGE } from '../../../config';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 2,
  },
});

class MainNavigation extends Component {
  state = { open: false };

  render() {
    const { classes } = this.props;
    return (
      <div className="content-navigation">
        <List>
          <Link to={PAGE.companies} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <Domain className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary="Companies" />
            </ListItem>
          </Link>
          <Link
            to={PAGE.clinics}
            activeClassName='active-route'
            className="nav-menu-list-item"
          >
            <ListItem button>
              <ListItemIcon>
                <LocalHospital className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary="Clinics" />
            </ListItem>
          </Link>
          <ListItem button onClick={() => this.setState({ open: !this.state.open })}>
            <ListItemIcon>
              <Person className="nav-icon" />
            </ListItemIcon>
            <ListItemText inset primary='Users'/>
            { this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
            <List className="collapsed-nav-item">
              <Link to={PAGE.simpleUsers} activeClassName='active-route' className="nav-menu-list-item">
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Heal Users" />
                </ListItem>
              </Link>
              <Link to={PAGE.organizationsUsers} activeClassName='active-route' className="nav-menu-list-item">
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Heal Work Users" />
                </ListItem>
              </Link>
              <Link to={PAGE.clinicsUsers} activeClassName='active-route' className="nav-menu-list-item">
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Heal Clinic Users" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <Link to={PAGE.tariffPlans} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <TariffPlan className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary='Tariff Plans'/>
            </ListItem>
          </Link>
          <Link to={PAGE.assets} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <InsertDriveFile className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary='Assets'/>
            </ListItem>
          </Link>
          <Link to={PAGE.matrixSetup} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <SettingsApplications className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary='Matrix'/>
            </ListItem>
          </Link>
          <Link to={PAGE.test} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <Accessibility className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary='Testing'/>
            </ListItem>
          </Link>
          <Link to={PAGE.chat} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <Chat className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary='Chat'/>
            </ListItem>
          </Link>
          <Link to={PAGE.appScreenInfo} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <PermDeviceInformation className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary={`App's Screen Info`}/>
            </ListItem>
          </Link>
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(withStyles(styles)(MainNavigation));

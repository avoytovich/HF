import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

// UI
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Person from 'material-ui-icons/Person'; // users
import Domain from 'material-ui-icons/Domain'; // companies
import InsertDriveFile from 'material-ui-icons/InsertDriveFile'; // resources
import LocalHospital from 'material-ui-icons/LocalHospital'; // clinics
import SettingsApplications from 'material-ui-icons/SettingsApplications'; // matrix

import { PAGE } from '../../../config';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
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
                <Domain />
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
                <LocalHospital />
              </ListItemIcon>
              <ListItemText inset primary="Clinics" />
            </ListItem>
          </Link>
          <ListItem button onClick={() => this.setState({ open: !this.state.open })}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText inset primary='Users'/>
            { this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
            <List className="collapsed-nav-item">
              <Link to={PAGE.companies} activeClassName='active-route' className="nav-menu-list-item">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <Domain />
                  </ListItemIcon>
                  <ListItemText inset primary="Companies" />
                </ListItem>
              </Link>
              <Link activeClassName='active-route' className="nav-menu-list-item">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <LocalHospital />
                  </ListItemIcon>
                  <ListItemText inset primary="Clinics" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <Link to={PAGE.resources} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <InsertDriveFile />
              </ListItemIcon>
              <ListItemText inset primary='Resources'/>
            </ListItem>
          </Link>
          <Link to={PAGE.matrixSetup} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <SettingsApplications />
              </ListItemIcon>
              <ListItemText inset primary='Matrix'/>
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

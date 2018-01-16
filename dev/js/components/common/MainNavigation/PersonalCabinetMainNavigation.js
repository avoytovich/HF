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
import InsertDriveFile from 'material-ui-icons/InsertDriveFile'; // assets
import LocalHospital from 'material-ui-icons/LocalHospital'; // Clinics
import SettingsApplications from 'material-ui-icons/SettingsApplications'; // matrix
import Chat from 'material-ui-icons/Chat'; // matrix
import Accessibility from 'material-ui-icons/Accessibility'; // matrix

import { PAGE } from '../../../config';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 2,
  },
});

class PersonalCabinetMainNavigation extends Component {
  state = { open: false };

  render() {
    const { classes } = this.props;
    return (
      <div className="content-navigation">
        <List>
          <Link
            to={PAGE.personalCabinetUsers}
            activeClassName='active-route'
            className="nav-menu-list-item"
          >
            <ListItem button>
              <ListItemIcon>
                <Person className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary="Users" />
            </ListItem>
          </Link>
          {/*<Link to={PAGE.assets} activeClassName='active-route' className="nav-menu-list-item">*/}
            {/*<ListItem button>*/}
              {/*<ListItemIcon>*/}
                {/*<InsertDriveFile className="nav-icon" />*/}
              {/*</ListItemIcon>*/}
              {/*<ListItemText inset primary='Assets'/>*/}
            {/*</ListItem>*/}
          {/*</Link>*/}
          {/*<Link to={PAGE.matrixSetup} activeClassName='active-route' className="nav-menu-list-item">*/}
            {/*<ListItem button>*/}
              {/*<ListItemIcon>*/}
                {/*<SettingsApplications className="nav-icon" />*/}
              {/*</ListItemIcon>*/}
              {/*<ListItemText inset primary='Matrix'/>*/}
            {/*</ListItem>*/}
          {/*</Link>*/}
          {/*<Link to={PAGE.test} activeClassName='active-route' className="nav-menu-list-item">*/}
            {/*<ListItem button>*/}
              {/*<ListItemIcon>*/}
                {/*<Accessibility className="nav-icon" />*/}
              {/*</ListItemIcon>*/}
              {/*<ListItemText inset primary='Testing'/>*/}
            {/*</ListItem>*/}
          {/*</Link>*/}
          <Link to={PAGE.chat} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <Chat className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary='Chat'/>
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

export default  connect(mapStateToProps)(withStyles(styles)(PersonalCabinetMainNavigation));

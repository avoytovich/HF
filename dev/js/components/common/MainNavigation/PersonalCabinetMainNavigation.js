import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

// UI
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Person from 'material-ui-icons/Person'; // Users
import Domain from 'material-ui-icons/Domain'; // Profile
import Money from 'material-ui-icons/AttachMoney'; // Billing

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
            to={PAGE.personalCabinetProfile}
            activeClassName='active-route'
            className="nav-menu-list-item"
          >
            <ListItem button>
              <ListItemIcon>
                <Domain className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary="Profile" />
            </ListItem>
          </Link>
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
          <Link to={PAGE.personalCabinetBilling} activeClassName='active-route' className="nav-menu-list-item">
            <ListItem button>
              <ListItemIcon>
                <Money className="nav-icon" />
              </ListItemIcon>
              <ListItemText inset primary='Billing'/>
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

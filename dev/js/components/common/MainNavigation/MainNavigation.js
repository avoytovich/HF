import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import { connect } from 'react-redux';
// UI
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';


class MainNavigation extends Component {
  navigationList = [
    { title: 'Users',                 url: '/users' },
    { title: 'Resource',              url: '/resource' },
    { title: 'Matrix Setup',          url: '/matrix-setup' },
    { title: 'Test Diagnostic Flow',  url: '/test-diagnostic-flow' }
  ];

  _renderMenuItems (items = []) {
    return items.map((nav, index) =>
      <Link
        key={index}
        to={nav.url}
        activeClassName='active-route'
        className="nav-menu-list-item"
      >
        <ListItem
          button
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary={nav.title}
          />
        </ListItem>
      </Link>
    )
  }
  render() {
    return (
      <div className="content-navigation">
        <List>
        { this._renderMenuItems(this.navigationList)}
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(MainNavigation);


class NestedList extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <List>
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary="Sent mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Drafts" />
        </ListItem>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Inbox" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

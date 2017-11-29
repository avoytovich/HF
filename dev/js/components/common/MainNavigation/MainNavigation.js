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
  state = { open: false };

  navigationList = [
    { title: 'Users',                 url: '/users' },
    { title: 'Resource',              url: '/resource' },
    { title: 'Matrix Setup',          url: '/matrix-setup' },
    { title: 'Test Diagnostic Flow',  url: '/test-diagnostic-flow' }
  ];

  _onNavItemClick = (e, title) => {
    if (title === 'Users') {
      e.preventDefault();
      this.setState({ open: !this.state.open });
    }
  };

  _renderSubMenuItems = title => {
    return title === 'Users' ?
      (
        <div>
          <Collapse
            component="li"
            in={this.state.open}
            timeout="auto"
            unmountOnExit
          >
            <List disablePadding>
              <ListItem button>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </div>
      ) :
      null;
  };

  _renderMenuItems (items = []) {
    return items.map(({ title, url }, index) =>
      <Link
        onClick={e => this._onNavItemClick(e, title)}
        key={index}
        to={url}
        activeClassName='active-route'
        className="nav-menu-list-item"
      >
        <div className="nav-inner-item-wrapper">
          <ListItem
            button
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary={title}
            />
            { title !== 'Users' ? null : this.state.open ? <ExpandLess /> : <ExpandMore /> }
          </ListItem>
        </div>
        { this._renderSubMenuItems(title) }
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

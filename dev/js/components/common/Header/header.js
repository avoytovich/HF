import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import { assets } from '../../../config';

import {
  logoutSimple,
} from '../../../actions';

class Header extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => this.setState({ anchorEl: event.currentTarget });
  handleRequestClose = () => this.setState({ anchorEl: null });

  _signOut = () => {
    this.handleRequestClose();
    logoutSimple();
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {
      userReducer: {
        name = '',
      }
    } = this.props;
    return (
      <AppBar
        position="static"
        className="header-custom-black"
      >

        <Toolbar className="AppBar">
          <div className="header-logo-wrapper">
            <img
              src={`${assets}/images/common/logo.png`}
              className="img-responsive"
              alt="logo"
            />
          </div>

          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="default"
              className='header-user-info-wrapper'
            >
              <p className="header-user-name">{name}</p>
              <ArrowDropDown />

            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onRequestClose={this.handleRequestClose}
            >
              <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
              <MenuItem onClick={this._signOut}>Sign Out</MenuItem>
            </Menu>
          </div>

        </Toolbar>

      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer,
  userReducer: state.userReducer,
});

export default connect(mapStateToProps)(Header);
import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MuiSvgIcon from 'material-ui/SvgIcon';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';

const HomeIcon = (props) => (
  <MuiSvgIcon {...props} >
      <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
  </MuiSvgIcon>
);

const classes = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'spaceBetween'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Header extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => this.setState({ anchorEl: event.currentTarget });
  handleRequestClose = () => this.setState({ anchorEl: null });

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static" color="default">

        <Toolbar className="AppBar">

          <HomeIcon color="grey"/>

          <Typography type="title" color="inherit" className={classes.flex}>
            HEAL
          </Typography>

          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="default"
            >

              <AccountCircle />
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
              <MenuItem onClick={this.handleRequestClose}>Sign Out</MenuItem>
            </Menu>
          </div>

        </Toolbar>

      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default connect(mapStateToProps)(Header);
import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI
import AppBar from 'material-ui/AppBar';
import SvgIcon from 'material-ui/SvgIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


const HomeIcon = (props) => (
  <SvgIcon {...props} fill="#FFFFFF" height="36" viewBox="0 0 24 24" width="36">
      <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
  </SvgIcon>
);

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton>
        <MoreVertIcon color="white"/>
      </IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >

    <MenuItem primaryText="Profile" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);


const iconStyles = {
  height: '40px',
  width:  '40px',
};

class Header extends Component {

  render() {
    return (
      <AppBar
        className="header"
        iconElementLeft={<HomeIcon style={iconStyles} color="white"/>}
        iconElementRight={<Logged /> }
      />
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default connect(mapStateToProps)(Header);
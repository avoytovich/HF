import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header   from './common/Header/header';
// Components
import MainNavigation from './common/MainNavigation/MainNavigation';

class Main extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="main-wrapper">
          <Header/>
          <div className="main-content">
              <div className="content-navigation">
                <MainNavigation/>
              </div>
              <div className="content-children">
                { this.props.children }
              </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(Main);

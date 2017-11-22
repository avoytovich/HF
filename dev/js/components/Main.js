import React, { Component } from 'react';
import { connect } from 'react-redux';


import Header   from './common/Header/header';
// Components
import MainNavigation from './common/MainNavigation/MainNavigation';

class Main extends Component {

  render() {
    return (
        <div className="main-wrapper">
          <Header/>
          <div className="main-content">
              <div className="content-navigation">
                <MainNavigation/>
              </div>
              <div className="content-children">
                {/*{ this.props.children }*/}
              </div>
          </div>
        </div>
    )
  }
}
{/*<MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>*/}
{/* </MuiThemeProvider>*/}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(Main);

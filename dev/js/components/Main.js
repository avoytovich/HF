import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header   from './common/Header/header';
import HeaderAssets   from './assets/HeaderAssets/HeaderAssets';
import MainNavigation from './common/MainNavigation/MainNavigation';

import { PAGE } from '../config'

class Main extends Component {
  _pickHeader = pathname => {
    switch (pathname) {
      case PAGE.assetsUpload:
        return <HeaderAssets />;

      default:
        return <Header />;
    }
  };

  render() {
    const {
      location: {
        pathname,
      },
    } = this.props;
    return (
        <div className="main-wrapper">
          { this._pickHeader(pathname) }
          <div className="main-content">
              <div className="content-navigation">
                <MainNavigation/>
              </div>
              <div className="content-children">
                { this.props.children }
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

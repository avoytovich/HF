import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header   from './common/Header/Header';
import MainNavigation from './common/MainNavigation/MainNavigation';

class Main extends Component {

  render() {
    return (
        <div className="main-wrapper">
          <Header />
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

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(Main);

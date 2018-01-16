import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header   from './common/Header/Header';
import PersonalCabinetMainNavigation from './common/MainNavigation/PersonalCabinetMainNavigation';

class PersonalCabinetMain extends Component {

  render() {
    return (
        <div className="main-wrapper">
          <Header />
          <div className="main-content">
              <div className="content-navigation">
                <PersonalCabinetMainNavigation/>
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

export default  connect(mapStateToProps)(PersonalCabinetMain);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { C } from '../../../components'

class AppScreenInfoItem extends Component {
  render(){
    return(
      <div className="app-screen-info-container">
        <C.AppScreenInfoNav/>
      </div>
    )
  }
}

AppScreenInfoItem.propTypes = {};

AppScreenInfoItem.defaultProps = {};

export default AppScreenInfoItem;
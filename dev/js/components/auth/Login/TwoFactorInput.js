import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { C } from '../../../components';
import { dispatchAuthPayloadWired } from '../../../actions';

class TwoFactorInput extends Component {
  componentWillMount() {
    dispatchAuthPayloadWired({ twoFactorCode: '' })
  }

  render() {
    const {
      authReducer,
      authReducer: {
        twoFactorCode,
      },
    } = this.props;

    return (
      <C.Input
        id='twoFactorCode'
        type="number"
        value={twoFactorCode}
        reducer={authReducer}
        label="Code from the email"
      />
    );
  }
}

TwoFactorInput.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorInput);

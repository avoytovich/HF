import React, { Component } from 'react';
import { connect } from 'react-redux';

class RulesWithAnswerComponent extends Component {
  render() {
    return (
      <div className="rulesWithAnswer">

        <div className="rules">

        </div>

      </div>
    )
  }
}
const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});
export default  connect(mapStateToProps)(RulesWithAnswerComponent);

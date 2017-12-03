import React, { Component }         from 'react';
import { connect }                  from 'react-redux';

class RulesItemComponent extends Component {
  render() {
    return <div className="rule-item">
      <div className="rule-nav">

      </div>
      <div className="rule-item-details">

      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(RulesItemComponent);
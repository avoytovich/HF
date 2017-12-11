import React, { Component }   from 'react';
import { connect }            from 'react-redux';


class InComponent extends Component {
  render() {
    return (<div>In</div>)
  }
}

const mapStateToProps = state => ({
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(InComponent);
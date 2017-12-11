import React, { Component }   from 'react';
import { connect }            from 'react-redux';


class MultipleComponent extends Component {
  render() {
    return (<div>MultipleComponent</div>)
  }
}

const mapStateToProps = state => ({
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(MultipleComponent);
import React, { Component }   from 'react';
import { connect }            from 'react-redux';


class EqualComponent extends Component {
  render() {
    return (<div>Equal</div>)
  }
}

const mapStateToProps = state => ({
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(EqualComponent);
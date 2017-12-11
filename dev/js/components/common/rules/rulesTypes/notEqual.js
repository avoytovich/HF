import React, { Component }   from 'react';
import { connect }            from 'react-redux';


class NotEqualComponent extends Component {
  render() {
    return (<div>Not Equal</div>)
  }
}

const mapStateToProps = state => ({
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(NotEqualComponent);
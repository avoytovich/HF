import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Async }              from 'react-select';
import Menu, { MenuItem }     from 'material-ui/Menu';
import get                    from 'lodash/get'
import Select                 from 'material-ui/Select';
import {
  onAnswerChange,
  getAnswerValue,
  onConditionAsyncChange,
  getConditionOptions
}                             from '../../../../utils';

class ConditionsComponent extends Component {

  state = {
    type   : 'list', // list or range
  };

  componentWillReceiveProps(nextProps) {
    const { op: oldOp, value: oldValue, _key: oldKey } = this.props;
    const { op, value, _key } = nextProps;

    if (op !== oldOp || value !== oldValue || _key !== oldKey) {
      this.refs.async._onInputChange(nextProps._key);
    }
  }

  onAsyncChange = (value, edit) =>
    onConditionAsyncChange(value, edit, this.props);

  render() {
    const { key, op, value } = this.props.itemState;

    return <div className="rule-types">
      <div className="main-select">
        <div className="title">
          <div className="simple-question-variety">Condition</div>
        </div>

        <Async
          ref="async"
          id={`match-type-${this.props.path}-${this.props.pathType}`}
          name={`match-type-${this.props.path}-${this.props.pathType}`}
          loadOptions={(input) =>
            getConditionOptions(input, key, this.onAsyncChange, this.props, 'diagnostics', 'single', 'conditions')}
          onChange={(event) => this.onAsyncChange(event)}
          className="ansyc-select"
          value={key}
        />
      </div>

    </div>;
  }
}

const mapStateToProps = (state, props) => ({
  state    : state.createDiagnosisQuestion,
  itemState: get(state.createDiagnosisQuestion, `${props.path}.${props.pathType}`)
});

export default connect(mapStateToProps)(ConditionsComponent);
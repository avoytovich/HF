import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Async }              from 'react-select';
import Menu, { MenuItem }     from 'material-ui/Menu';
import get                    from 'lodash/get'
import Select                 from 'material-ui/Select';
import QuestionVariety        from '../questionVariety';
import {
  onMultipleAsyncChange,
  getMultipleAnswerValue,
  getOptions,
  onAnswerChange
}                             from '../../../../utils';

class MultipleComponent extends Component {

  state = {
    answers: [],
    type   : 'list', // list or range
    min    : 0,
    max    : 0,
  };

  componentWillReceiveProps(nextProps) {
    const { op: oldOp, value: oldValue, _key: oldKey } = this.props;
    const { op, value, _key } = nextProps;

    if (op !== oldOp || value !== oldValue || _key !== oldKey) {
      this.refs.async._onInputChange(nextProps._key);
    }
  }

  onAsyncChange = (value, edit) => {
    this.setState({...onMultipleAsyncChange(value, edit, this.props)});
  };

  render() {
    const { key, value } = this.props.itemState,
            selectValue    = getMultipleAnswerValue(this.state.answers, value);

    return <div className="rule-types">
      <div className="main-select">

        <QuestionVariety />

        <Async
          ref="async"
          id={`multiple-type-${this.props.path}-${this.props.pathType}`}
          name={`multiple-type-${this.props.path}-${this.props.pathType}`}
          loadOptions={(input) =>
            getOptions(input, key, this.onAsyncChange, this.props, 'diagnostics', 'multiple')}
          onChange={this.onAsyncChange}
          className="ansyc-select"
          value={key}
        />
      </div>

      <div className="answer-select">
        <div className="title">
          Answer
        </div>

        <Select
          multiple
          id={`answer-${this.props.path}-${this.props.pathType}`}
          name={`answer-${this.props.path}-${this.props.pathType}`}
          value={ selectValue || ['A'] }
          onChange={(event) => onAnswerChange(event, this.props, 'value')}
          className="types-select"
          margin="normal"
          disabled={!this.state.answers.length}
          fullWidth={true}
          renderValue={item => `${item},`}
        >
          {this.state.answers.map((option, index) =>
            (<MenuItem key={index}
                       className="CMuiInput"
                       value={option.label }>
              {option.label}.{option.value}
            </MenuItem>))}
        </Select>
      </div>
    </div>;
  }
}

const mapStateToProps = (state, props) => ({
  state    : state.createDiagnosisQuestion,
  itemState: get(state.createDiagnosisQuestion, `${props.path}.${props.pathType}`)
});

export default connect(mapStateToProps)(MultipleComponent);
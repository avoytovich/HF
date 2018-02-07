import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Async }              from 'react-select';
import Menu, { MenuItem }     from 'material-ui/Menu';
import get                    from 'lodash/get'
import Select                 from 'material-ui/Select';
import QuestionVariety        from '../questionVariety';
import {
  getMultipleAnswerValue,
  onMultipleAsyncChange,
  getOptions,
  onAnswerChange
}                             from '../../../../utils'


class NotInComponent extends Component {
  state = {
    answers: [],
    type   : 'list',
    min    : 0,
    max    : 0,
  };

  onAsyncChange = (value, edit) => {
    const res = {...onMultipleAsyncChange(value, edit, this.props)};
    this.setState(res);
  }

  render() {
    const { key, value } = this.props.itemState;
    const selectValue    = getMultipleAnswerValue(this.state.answers, value);

    return <div className="rule-types">
      <div className="main-select">

        <QuestionVariety />

        <Async
          id={`in-type-${this.props.path}-${this.props.pathType}`}
          name={`in-type-${this.props.path}-${this.props.pathType}`}
          loadOptions={(input) =>
            getOptions(input, key, this.onAsyncChange, this.props, 'diagnostics', undefined)}
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
          value={ selectValue }
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
  state: state.createDiagnosisQuestion,
  itemState: get(state.createDiagnosisQuestion, `${props.path}.${props.pathType}`)
});

export default connect(mapStateToProps)(NotInComponent);
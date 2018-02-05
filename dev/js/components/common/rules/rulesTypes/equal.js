import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Async }              from 'react-select';
import Menu, { MenuItem }     from 'material-ui/Menu';
import get                    from 'lodash/get'
import Select                 from 'material-ui/Select';
import QuestionVariety        from '../questionVariety';
import {
  onAnswerChange,
  getAnswerValue,
  onSingleAsyncChange,
  getOptions
}                             from '../../../../utils';

class EqualComponent extends Component {

  state = {
    answers: [],
    type   : 'list', // list or range
    min    : 0,
    max    : 0,
  };

  onAsyncChange = (value, edit) =>
    this.setState({...onSingleAsyncChange(value, edit, this.props)});

  render() {
    const { key, op, value } = this.props.itemState,
            selectValue      = getAnswerValue(this.state.answers, value);

    return <div className="rule-types">
      <div className="main-select">

        <QuestionVariety />

        <Async
          id={`match-type-${this.props.path}-${this.props.pathType}`}
          name={`match-type-${this.props.path}-${this.props.pathType}`}
          loadOptions={(input) =>
            getOptions(input, key, this.onAsyncChange, this.props, 'diagnostics', 'single')}
          onChange={(event) => this.onAsyncChange(event)}
          className="ansyc-select"
          value={key}
        />
      </div>

      <div className="answer-select">
        <div className="title">
          Answer
        </div>

        {this.state.type === 'list' ?
          <Select
            id={`answer-${this.props.path}-${this.props.pathType}`}
            name={`answer-${this.props.path}-${this.props.pathType}`}
            value={ selectValue || 'A' }
            onChange={(event) => onAnswerChange(event, this.props, 'value') }
            className="types-select"
            margin="normal"
            disabled={!this.state.answers.length}
            fullWidth={true}
            renderValue={item => item}
          >
            {this.state.answers.map((option, index) =>
              (<MenuItem key={index}
                         value={option.label }>
                {option.label}.{option.value}
              </MenuItem>))}
          </Select>
          :
          <div className="range-answer">
            <div className="range-answer-title">
              {value || 0}
            </div>
            <input type="range"
                   id={`range-${this.props.path}-${this.props.pathType}`}
                   name={`range-${this.props.path}-${this.props.pathType}`}
                   value={value}
                   min={this.state.min}
                   max={this.state.max}
                   onChange={(event) => onAnswerChange(event, this.props, 'value')}
            />
          </div>}
      </div>
    </div>;
  }
}

const mapStateToProps = (state, props) => ({
  state    : state.createDiagnosisQuestion,
  itemState: get(state.createDiagnosisQuestion, `${props.path}.${props.pathType}`)
});

export default connect(mapStateToProps)(EqualComponent);
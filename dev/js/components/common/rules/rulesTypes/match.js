import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Async }              from 'react-select';
import TextField              from 'material-ui/TextField';
import Menu, { MenuItem }     from 'material-ui/Menu';
import get                    from 'lodash/get'

import {
  changeTypeOfRule,
  addDefaultGroupRule,
  findByArea,
  setQuestion
}                             from '../../../../actions';


const SYMBOLS = [
  {value: '>',   label: '>'},
  {value: '<',   label: '<'},
  {value: '>=',  label: '>='},
  {value: '<=',  label: '<='},
  {value: '!=',  label: '!='},
  {value: '==',  label: '=='}
];

class MatchComponent extends Component {

  state = {
    answers: [],
    type: 'list', // list or range
    min: 0,
    max: 0,
  };

  getOptions = (input) => {
    if (input.length < 3)
      return Promise.resolve({ options: [] });

    const { type, area, step } = this.props;

    const body = { type, area, step, "answerType": "single" };

    return findByArea('diagnostics', 'findByAre', body, input).then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.question.en, value: item.key }));
      return {
        options: _data,
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      }
    });
  };

  getAnswersList = (values) =>
    Object.keys(values).map(key => ({label: key, value: values[key]}) );

  onChange = (value) => {
    const { subtype, type, values, min, max} = value.answer;
    const {path, pathType} = this.props;

     if (subtype === 'range') {
       this.setState({type: 'range', min, max});
       setQuestion(path, pathType, {key: value.key, op: '==', value: min});
     }
     else {
       const answers = this.getAnswersList(values);
       this.setState({type: 'list', answers});
       setQuestion(path, pathType, {key: value.value, op: '==', value: 'A'});
     }

//      const answers = this.getAnswersList(values);
  };

  onSymbolChange = (event) => {
    const value = event.target.value;
    const {path, pathType} = this.props;
    setQuestion(path, pathType, value, 'op');
  };

  onAnswerChange = (event) => {
    const value = event.target.value;
    const {path, pathType} = this.props;
    setQuestion(path, pathType, value.label, 'value');
  };

  rangeChanged = (event) => {
    const value = [event.target.value];
    const { path, pathType } = this.props;
    setQuestion(path, pathType, value, 'value');
  };


  getSymbolValue = (value) => {
    debugger;
   return SYMBOLS.reduce((result, item) => {
     debugger;
     return item && item.value === value ? item.value : result
   }, '==');
  };

  getAnswerValue = (list, value) => {
    return list.reduce((result, item) => {
      if (item && !value) return item.label;

      return item.label === value ? item.label : result
    },'A' );
  };


  render() {
    const { key, op, value } = this.props.itemState[0];
    const opValue     = this.getSymbolValue(op);
    const selectValue = this.getAnswerValue(this.state.answers, value);
    console.log('opValue', opValue);
    console.log('selectValue', selectValue);

    return <div className="rule-types">
      <div className="main-select">
        <div className="title">
          Question
        </div>
        <Async
          name="match-type"
          loadOptions={this.getOptions}
          onChange={this.onChange}
          className="ansyc-select"
          value={key}
        />
      </div>

      <div className="symbol-select">
        <div className="title">
          Symbol
        </div>
        <TextField
          id="types"
          select
          value={ opValue }
          onChange={(event) => this.onSymbolChange(event)}
          className="types-select"
          margin="normal"
          fullWidth={true}
        >
          {SYMBOLS.map((option, index) =>
            (<MenuItem key={index}
                       value={option.value}>
              {option.label}
            </MenuItem>))}
        </TextField>
      </div>

      <div className="answer-select">
        <div className="title">
          Answer
        </div>

        {this.state.type === 'list' ?
          <TextField
            id="match-answer"
            select
            value={ selectValue || 'A' }
            onChange={(event) => this.onAnswerChange(event)}
            className="types-select"
            margin="normal"
            disabled={!this.state.answers.length}
            fullWidth={true}
          >
            {this.state.answers.map((option, index) =>
              (<MenuItem key={index}
                         value={option.label }>
                {option.label}
              </MenuItem>))}
          </TextField>
          :
          <div className="range-answer">
            <div className="range-answer-title">
              {value || 0}
            </div>
            <input type="range"
                   value={value}
                   min={this.state.min}
                   max={this.state.max}
                   onChange={this.rangeChanged}
            />
          </div>
        }

      </div>

    </div>;
  }
}

const mapStateToProps = (state, props) => ({
  state: state.createDiagnosisQuestion,
  itemState: get(state.createDiagnosisQuestion, `${props.path}.${props.pathType}`)
});

export default connect(mapStateToProps)(MatchComponent);
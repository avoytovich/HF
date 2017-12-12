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
import {
  onAnswerChange,
  onSymbolChange,
  getSymbolValue,
  getAnswerValue,
  getAnswersList,
  SYMBOLS
}                             from '../../../../utils';


class MatchComponent extends Component {
  state = {
    answers: [],
    type: 'list', // list or range
    min: 0,
    max: 0,
  };

  getOptions = (input, key) => {
    if (input.length < 3 && !key)
      return Promise.resolve({ options: [] });

    const { type, area, step } = this.props;
    const body = { type, area, step, "answerType": "single" };

    return findByArea('diagnostics', 'findByAre', body, input || key).then(res => {
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



  onAsyncChange = (value, some) => {
    const { path, pathType } = some;
    const { subtype, type, values, min, max} = value.answer;

    if (subtype === 'range') {
      this.setState({type: 'range', min, max});
      setQuestion(path, pathType, {key: value.key, op: '==', value: [min]});
    }
    else {
      const answers = getAnswersList(values);
      this.setState({type: 'list', answers});
      setQuestion(path, pathType, {key: value.value, op: '==', value: ['A']});
    }
  };


  render() {
    const { key, op, value } = this.props.itemState[0];
    const opValue     = getSymbolValue(op);
    const selectValue = getAnswerValue(this.state.answers, value);
    const options =  [{value: key, label: key}]
    console.log('options', options);
    console.log('key', key);

    return <div className="rule-types">
      <div className="main-select">
        <div className="title">
          Question
        </div>
        <Async
          id={`match-type-${this.props.path}-${this.props.pathType}`}
          name={`match-type-${this.props.path}-${this.props.pathType}`}
          loadOptions={(input) => this.getOptions(input, key)}
          onChange={(event) => this.onAsyncChange(event, this.props)}
          className="ansyc-select"
          value={ key }
        />
      </div>

      <div className="symbol-select">
        <div className="title">
          Symbol
        </div>
        <TextField
          id={`symbols-${this.props.path}-${this.props.pathType}`}
          name={`symbols-${this.props.path}-${this.props.pathType}`}
          select
          value={ opValue }
          onChange={(event) => onSymbolChange(event, this.props)}
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
            id={`answer-${this.props.path}-${this.props.pathType}`}
            name={`answer-${this.props.path}-${this.props.pathType}`}
            select
            value={ selectValue || 'A' }
            onChange={(event) => onAnswerChange(event, this.props, 'value') }
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
                   id={`range-${this.props.path}-${this.props.pathType}`}
                   name={`range-${this.props.path}-${this.props.pathType}`}
                   value={value}
                   min={this.state.min}
                   max={this.state.max}
                   onChange={(event) => onAnswerChange(event, this.props, 'value')}
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
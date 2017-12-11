import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Async }              from 'react-select';
import TextField              from 'material-ui/TextField';
import Menu, { MenuItem }     from 'material-ui/Menu';
import get                    from 'lodash/get'
import Select                 from 'material-ui/Select';
import {
  findByArea,
  setQuestion
}                             from '../../../../actions';
import {
  onAnswerChange,
  getAnswerValue,
  getAnswersList,
}                             from '../../../../utils';

class EqualComponent extends Component {

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

  onAsyncChange = (value) => {
    const { subtype, type, values, min, max} = value.answer;
    const {path, pathType} = this.props;

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
    const selectValue = getAnswerValue(this.state.answers, value);

    return <div className="rule-types">
      <div className="main-select">
        <div className="title">
          Question
        </div>
        <Async
          id={`match-type-${this.props.path}-${this.props.pathType}`}
          name={`match-type-${this.props.path}-${this.props.pathType}`}
          loadOptions={this.getOptions}
          onChange={(event) => this.onAsyncChange(event, this.props)}
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

export default connect(mapStateToProps)(EqualComponent);
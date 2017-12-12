import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Async }              from 'react-select';
import Menu, { MenuItem }     from 'material-ui/Menu';
import get                    from 'lodash/get'
import Select                 from 'material-ui/Select';
import {
  findByArea,
  setQuestion
}                             from '../../../../actions';

class MultipleComponent extends Component {
  state = {
    answers: [],
    type: 'list', // list or range
    min: 0,
    max: 0,
  };

  getOptions = (input, key) => {
    switch(true) {
      case !input.length && !key:
        return Promise.resolve({options:[]});

      case input.length && input.length < 3:
        return Promise.resolve({options:[]});
      default:

        const {type, area, step} = this.props;

        const body = {
          type,
          area,
          step,
          "answerType":"multiple"
        };

        return findByArea('diagnostics', 'findByAre', body, input || key).then(res => {
          const {data} = res.data;
          const _data = data.map(item =>
            Object.assign({}, item, {
              label:item.question.en,
              value:item.key
            }));

          !input.length && key && this.onAsyncChange(_data[0], true);

          return {
            options:_data,
            // CAREFUL! Only set this to true when there are no more options,
            // or more specific queries will not be sent to the server.
            complete:true
          }
        });
    }
  };

  getAnswersList = (values) =>
    Object.keys(values).map(key => ({label: key, value: values[key]}) );

  onAsyncChange = (value, edit) => {
    const { path, pathType, itemState} = this.props;

    if (!value || (Array.isArray(value) && !value.length)) {
      return  setQuestion(path, pathType, '', 'value');
    }

    const { subtype, type, values, min, max} = value.answer;
    const answers = this.getAnswersList(values);

    this.setState({type: 'list', answers});
    const _value = edit ? itemState[0].value :  ['A'];
    setQuestion(path, pathType, {key: value.value, value: _value});

  };

  onAnswerChange = (event, {path, pathType}) => {
    const value = event.target.value;
    setQuestion(path, pathType, value, 'value');
  };


  getAnswerValue = (list, value) =>
    list.reduce((result, item) => {
      if (item && !value) return item.label;
      return value.some(el => el === item.label) ? result.concat(item.label) : result;
    }, []);


  render() {
    const { key, value } = this.props.itemState[0];
    const selectValue = this.getAnswerValue(this.state.answers, value);

    return <div className="rule-types">
      <div className="main-select">
        <div className="title">
          Question
        </div>
        <Async
          id={`match-type-${this.props.path}-${this.props.pathType}`}
          name={`match-type-${this.props.path}-${this.props.pathType}`}
          loadOptions={(input) => this.getOptions(input, key)}
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
          onChange={(event) => this.onAnswerChange(event, this.props)}
          className="types-select"
          margin="normal"
          disabled={!this.state.answers.length}
          fullWidth={true}
          renderValue={item => `${item},`}
        >
          {this.state.answers.map((option, index) =>
            (<MenuItem key={index}
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

export default connect(mapStateToProps)(MultipleComponent);
import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Async }              from 'react-select';
import Menu, { MenuItem }     from 'material-ui/Menu';
import get                    from 'lodash/get'
import Select                 from 'material-ui/Select';
import { setQuestion }        from '../../../../actions';
import {
  getAnswersList,
  getMultipleAnswerValue,
  getOptions
}                             from '../../../../utils';

class MultipleComponent extends Component {
  state = {
    answers: [],
    type: 'list', // list or range
    min: 0,
    max: 0,
  };

  onAsyncChange = (value, edit) => {
    const { path, pathType, itemState} = this.props;

    if (!value || (Array.isArray(value) && !value.length))
      return  setQuestion(path, pathType, '', 'value');

    const { subtype, type, values, min, max} = value.answer;
    const answers = getAnswersList(values);

    this.setState({type: 'list', answers});
    const _value = edit ? itemState[0].value :  ['A'];
    setQuestion(path, pathType, {key: value.value, value: _value});

  };

  onAnswerChange = (event, {path, pathType}) => {
    const value = event.target.value;
    setQuestion(path, pathType, value, 'value');
  };


  render() {
    const { key, value } = this.props.itemState[0];
    const selectValue    = getMultipleAnswerValue(this.state.answers, value);

    return <div className="rule-types">
      <div className="main-select">
        <div className="title">
          Question
        </div>
        <Async
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
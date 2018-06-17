import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Async }              from 'react-select';
import TextField              from 'material-ui/TextField';
import Select                 from 'material-ui/Select';
import Menu, { MenuItem }     from 'material-ui/Menu';
import get                    from 'lodash/get'
import sortBy                 from 'lodash/sortBy'
import capitalize             from 'lodash/capitalize'
import QuestionVariety        from '../questionVariety';
import {
  onAnswerChange,
  onSymbolChange,
  getSymbolValue,
  getAnswerValue,
  getOptions,
  onSingleAsyncChange,
  trickForUpdateComponent,
  SYMBOLS
}                             from '../../../../utils';

class MatchComponent extends Component {

  state = {
    answers: [],
    type   : 'list',  // list or range
    min    : 0,
    max    : 0,
  };

  componentWillReceiveProps(nextProps) {
    trickForUpdateComponent(this.props, nextProps, this.refs.async._onInputChange);
  }

  onAsyncChange = (value, edit) =>
    this.setState({...onSingleAsyncChange(value, edit, this.props)});


  renderAnswersItem = (listType, selectValue, value) => {
    switch (listType) {
      case "list":
        return (
          <Select
            id={`answer-${this.props.path}-${this.props.pathType}`}
            name={`answer-${this.props.path}-${this.props.pathType}`}
            value={selectValue}
            onChange={event => onAnswerChange(event, this.props, "value")}
            className="types-select"
            margin="normal"
            fullWidth={true}
            renderValue={item => item}
          >
            {this.state.answers.map((option, index) => {
              return (
                <MenuItem value={option.label} key={index}>
                  {option.value}
                </MenuItem>
              );
            })}
          </Select>
        );

      case "range":
        return (
          <div className="range-answer">
            <div className="range-answer-title">{value || 0}</div>

            <input
              type="range"
              id={`range-${this.props.path}-${this.props.pathType}`}
              name={`range-${this.props.path}-${this.props.pathType}`}
              value={value}
              min={this.state.min}
              max={this.state.max}
              onChange={event => onAnswerChange(event, this.props, "value")}
            />
          </div>
        );
    }
  };


  render() {
    const { _key: key, op, value } = this.props,
          opValue            = getSymbolValue(op),
          selectValue        = getAnswerValue(this.state.answers, value);

    console.log(!!key);

    return <div className="rule-types">
      <div className="main-select">

        <QuestionVariety />

        <Async
          ref="async"
          id={`match-type-${this.props.path}-${this.props.pathType}`}
          name={`match-type-${this.props.path}-${this.props.pathType}`}
          loadOptions={(input) =>
            getOptions(input, key, this.onAsyncChange, this.props, 'diagnostics', 'single')}
          onChange={(event) => this.onAsyncChange(event)}
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
                       className="CMuiInput"
                       value={option.value}>
              {option.label}
            </MenuItem>))}
        </TextField>
      </div>

      <div className="answer-select">
        <div className="title">
          Answer
        </div>

        {!!key ?
          this.renderAnswersItem(this.state.type, selectValue, value) :
          <Select
            id={`answer-${this.props.path}-${this.props.pathType}`}
            name={`answer-${this.props.path}-${this.props.pathType}`}
            value={'1'}
            disabled={true}
            className="types-select"
            margin="normal"
            fullWidth={true}
            renderValue={item => item}
          />
        }
      </div>
    </div>;
  }
}

const mapStateToProps = (state, props) => ({
  state    : state.createDiagnosisQuestion,
});

export default connect(mapStateToProps)(MatchComponent);
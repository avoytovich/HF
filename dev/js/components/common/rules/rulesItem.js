import React, { Component } from 'react';
import { connect }          from 'react-redux';
import TextField            from 'material-ui/TextField';
import Typography           from 'material-ui/Typography';
import Menu, { MenuItem }   from 'material-ui/Menu';
import IconButton           from 'material-ui/IconButton';
import * as  SA             from 'react-select';
import DeleteIcon           from 'material-ui-icons/Delete';
import {
  changeTypeOfRule,
  addDefaultGroupRule,
  findByArea,
  deleteRules,
  setQuestion
}                           from '../../../actions';
import {
  DEFAULT_ITEM_TYPE,
  TYPES,
  findType
}                           from '../../../utils/matrix';
import Select               from 'material-ui/Select';
import Input                from 'material-ui/Input';
import get                  from 'lodash/get'
import {
  MatchComponent,
  EqualComponent,
  InComponent,
  MultipleComponent,
  NotEqualComponent,

}   from './rulesTypes';

import { DEF_ITEM }     from '../../../utils/matrix';


class RulesItemComponent extends Component {
  state = {
    answer: [],
    answers: [],
  };


  handleChange = (event, path, item) => {
    const type  = event.target.value;
    changeTypeOfRule(path, item, type);

    if (findType(type) === 'block') {
      addDefaultGroupRule(type, path, [{ [ DEFAULT_ITEM_TYPE || 'match' ]: [ DEF_ITEM ] }]);
    }
  };

  delete = (path, type) => deleteRules(path, type);

  getOptions = (input) => {
    if (input.length <= 2)
      return Promise.resolve({ options: [] });

    const { reqType, area, step } = this.props;

    const body = {
      "type": reqType,
      "area": area.key || area.value || area.title,
      "step": step,
      "answerType": "single"
    };
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

  getAnswersList = (data) => {
    const { type, values } = data.answer;
    // TODO: ...
    return Object.keys(values)
      .map(key => ({label: key, value: values[key]}) );
  };

  handleChange2 = (event) => {
    this.setState({ answer: event.target.value });
  };


  checkTypes = () => {
    const { reqType, area, step, type, path } = this.props;

    const _props = {
      area: area.key || area.value || area.title,
      type: reqType,
      step: step,
      path,
      pathType: type
    };

    switch (type) {
      case 'match':
       return <MatchComponent {..._props}/>;
      case 'equal':
        return <EqualComponent {..._props}/>;
      case 'multiple':
        return <MultipleComponent {..._props}/>;
      case 'notEqual':
        return <NotEqualComponent {..._props}/>;
      case 'in':
        return <InComponent/>;
      default:
    }
  };

  render() {
    const { type, key, path, item } = this.props;

    return <div className="rule-item">
      <div className="rule-nav">
        <TextField
          id="types"
          select
          value={type}
          onChange={(event) => this.handleChange(event, path, type)}
          className="types-select"
          margin="normal"
          fullWidth={true}
        >
          {TYPES.map((option, index) =>
            (<MenuItem key={index}
                       value={option.value}>
              {option.label}
            </MenuItem>))}
        </TextField>
      </div>
      <div className="rule-item-details">
        {this.checkTypes()}
      </div>
      <div className="rule-item-delete">
        <IconButton aria-label="Delete" onClick={() => this.delete(path, type)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  }
}

const mapStateToProps = (state, props) =>{
  const { path, type } = props;
  return ({
    state: state.createDiagnosisQuestion,
    itemState: get(state.createDiagnosisQuestion, `${path}.${type}`)
  })
};

export default connect(mapStateToProps)(RulesItemComponent);
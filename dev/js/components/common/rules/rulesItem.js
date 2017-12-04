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
  findArea,
  deleteRules
}                           from '../../../actions';
import {
  DEFAULT_ITEM_TYPE,
  TYPES,
  findType
}                           from '../../../utils/matrix';
import Select               from 'material-ui/Select';
import Input                from 'material-ui/Input';


const names = [
  {label: 'A', value: 'a'},
  {label: 'B', value: 'b'},
  {label: 'C', value: 'c'},
  {label: 'D', value: 'd'},
];

class RulesItemComponent extends Component {

  state = {
    answer: []
  };


  handleChange = (event, path, item) => {
    const type  = event.target.value;
    changeTypeOfRule(path, item, type);

    if (findType(type) === 'block') {
      addDefaultGroupRule(type, path, [{ [ DEFAULT_ITEM_TYPE || 'match' ]: [] }]);
    }
  };

  delete = (path, type) => deleteRules(path, type);

  getOptions = (input) => {
    return findArea('diagnostics', 'findArea').then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.title }));
      return {
        options: _data,
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      }
    });
  };

  onAreasChange = (value) => {
//    updateCrateQuestionFields(value, 'bodyAreas')
  };


  handleChange2 = (event) => {
    console.log('event.target.value', event.target.value);

    const currentSelect   = event.target.value.map(item => names.filter(current => current.value === item));
    console.log('currentSelect', currentSelect);


    this.setState({ answer: currentSelect });
    console.log(this.state)
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

        <div className="rule-item-question">
          <Typography type="caption" gutterBottom>
            Question
          </Typography>
          <SA.Async
            name="body-areas"
            loadOptions={this.getOptions}
            onChange={this.onAreasChange}
            className="ansyc-select"
            value={''}
          />
        </div>

        <div className="rule-item-answer">
          <Typography type="caption" gutterBottom>
            Answer
          </Typography>
          <div>


            <Select
              multiple
              value={this.state.answer}
              onChange={this.handleChange2}
              input={<Input id="name-multiple" />}
              MenuProps={{
                PaperProps: {
                  style: {
                    width: 400,
                  },
                },
              }}
            >
              {names.map((item, index) => (
                <MenuItem
                  key={`${index}.${item.value}`}
                  value={item.value}
                  style={{
                    fontWeight: this.state.answer.indexOf(item.value) !== -1 ? '500' : '400',
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>



          </div>
        </div>

        <div className="rule-item-delete">
          <IconButton aria-label="Delete" onClick={() => this.delete(path, type)}>
            <DeleteIcon />
          </IconButton>
        </div>

      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(RulesItemComponent);
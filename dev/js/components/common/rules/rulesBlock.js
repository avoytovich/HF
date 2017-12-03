import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import AddIcon                from 'material-ui-icons/Add';
import { RulesItemComponent } from './';
import MenuItem               from 'material-ui/Menu/MenuItem';
import TextField              from 'material-ui/TextField';
import { changeTypeOfRule }   from '../../../actions';


const TYPES = [
  {label: 'And',  value: 'and'},
  {label: 'Or',   value: 'or'},
  {label: 'Not',  value: 'not'},
];

class RulesBlockComponent extends Component {

  handleChange = (event, path, item) => {
    const type  = event.target.value;
    changeTypeOfRule(path, item, type);
  };

  render() {
    const { type, key, path, item } = this.props;

    return <div className="rule-block">
      <div className={`nav ${type}`}>
        <TextField
          id={`select-currency ${key}`}
          select
          value={type}
          onChange={(event) => this.handleChange(event, path, type)}
          className="types-select"
          margin="normal"
        >
          {TYPES.map((option, index) =>
            (<MenuItem key={index}
                      value={option.value}>
              {option.label}
            </MenuItem>))}
        </TextField>

      </div>
      <div className="rule-block-details">

        <RulesItemComponent/>

        <div className="add-item">
          <AddIcon /> ADD
        </div>

      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(RulesBlockComponent);
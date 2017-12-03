import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import TextField              from 'material-ui/TextField';
import Menu, { MenuItem }     from 'material-ui/Menu';
import { changeTypeOfRule }   from '../../../actions';

const TYPES = [
  {label: 'Equal',     value: 'equal'},
  {label: 'Not Equal', value: 'notEqual'},
  {label: 'Match',     value: 'match'},
];


class RulesItemComponent extends Component {

  handleChange = (event, path, item) => {
    const type  = event.target.value;
    changeTypeOfRule(path, item, type);
  };

  render() {
    const { type, key, path, item } = this.props;
    return <div className="rule-item">
      <div className="rule-nav">
        <TextField
          id={`ss ${key}`}
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
      <div className="rule-item-details">

      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(RulesItemComponent);
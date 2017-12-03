import React, { Component } from 'react';
import { connect }          from 'react-redux';
import TextField            from 'material-ui/TextField';
import Typography           from 'material-ui/Typography';
import Menu, { MenuItem }   from 'material-ui/Menu';
import IconButton           from 'material-ui/IconButton';
import DeleteIcon           from 'material-ui-icons/Delete';
import {
  changeTypeOfRule,
  addDefaultGroupRule,
  deleteRules
}                           from '../../../actions';
import {
  DEFAULT_ITEM_TYPE,
  TYPES,
  findType
}                           from '../../../utils/matrix';

class RulesItemComponent extends Component {

  handleChange = (event, path, item) => {
    const type  = event.target.value;
    changeTypeOfRule(path, item, type);

    if (findType(type) === 'block') {
      addDefaultGroupRule(type, path, [{ [ DEFAULT_ITEM_TYPE || 'match' ]: [] }]);
    }
  };

  delete = (path, type) => deleteRules(path, type);

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
          <div>
            dddd
          </div>
        </div>

        <div className="rule-item-answer">
          <Typography type="caption" gutterBottom>
            Answer
          </Typography>
          <div>
            sss
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
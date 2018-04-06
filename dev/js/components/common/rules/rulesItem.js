import React, { Component } from 'react';
import { connect }          from 'react-redux';
import TextField            from 'material-ui/TextField';
import Menu, { MenuItem }   from 'material-ui/Menu';
import IconButton           from 'material-ui/IconButton';
import DeleteIcon           from 'material-ui-icons/Delete';
import {
  changeTypeOfRule,
  addDefaultGroupRule,
  deleteRules,
}                           from '../../../actions';
import {
  DEFAULT_ITEM_TYPE,
  checkQuestionType,
  findType
}                           from '../../../utils/matrix';
import get                  from 'lodash/get'
import {
  MatchComponent,
  EqualComponent,
  InComponent,
  MultipleComponent,
  NotInComponent,
  NotEqualComponent,
  ConditionsComponent,
  TreatmentComponent
}                           from './rulesTypes';
import { DEF_ITEM }         from '../../../utils/matrix';


class RulesItemComponent extends Component {
  listTypes = [];

  componentWillMount() {
    this.listTypes = checkQuestionType(this.props.page);
  }


  handleChange = (event, path, item) => {
    const type  = event.target.value;
    changeTypeOfRule(path, item, type);
    if (findType(type) === 'block') {
      addDefaultGroupRule(type, path, [{ [ DEFAULT_ITEM_TYPE || 'match' ]:  DEF_ITEM }]);
    }
  };

  delete = (path, type) => deleteRules(path, type);

  checkTypes = () => {
    const { reqType, area, step, type, path, page } = this.props;
    const { key, op, value } = this.props.itemState;
    const { questionKey } = this.props.store;

    const _props = {
      areaIds: area || [],
      type: reqType,
      step: step,
      path, page,
      reqType: page === 'evaluations' ? 'evaluations' : 'diagnostics',
      pathType: type,
      _key: key,
      op, value, questionKey
    };
    console.log(this.props)
    switch (type) {
      case 'match':
       return <MatchComponent {..._props}/>;
      case 'equal':
        return <EqualComponent {..._props}/>;
//      case 'multiple':
//        return <MultipleComponent {..._props}/>;
      case 'notEqual':
        return <NotEqualComponent {..._props}/>;
      case 'in':
        return <InComponent {..._props}/>;
      case 'notIn':
        return <NotInComponent {..._props}/>;
      case 'true':
        return <ConditionsComponent {..._props}/>;
      case 'treatment':
        return <TreatmentComponent {..._props}/>;
      default:
    }
  };

  render() {
    const { type, key, path, item, page} = this.props;

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
          {this.listTypes.map((option, index) =>
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
    store    : state.createDiagnosisQuestion,
    itemState: get(state.createDiagnosisQuestion, `${path}.${type}`)
  })
};

export default connect(mapStateToProps)(RulesItemComponent);
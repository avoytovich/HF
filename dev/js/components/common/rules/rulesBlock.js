import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import AddIcon                from 'material-ui-icons/Add';
import { RulesItemComponent } from './';
import TextField              from 'material-ui/TextField';
import { changeTypeOfRule }   from '../../../actions';
import Button                 from 'material-ui/Button';
import ClickAwayListener      from 'material-ui/utils/ClickAwayListener';
import Menu, { MenuItem }     from 'material-ui/Menu';
import {
  mathType,
  checkQuestionType,
  findType
}                             from '../../../utils/matrix';
import {
  addRules,
  changeToItemRuleRule
}                             from '../../../actions';
import { TYPES, DEF_ITEM }    from '../../../utils/matrix';

class RulesBlockComponent extends Component {
  listTypes = [];

  state = {
    open: false
  };

  componentDidMount() {
    this.listTypes = checkQuestionType(this.props.page);
  }

  handleChange = (event, path, item) => {
    const type  = event.target.value;
    changeTypeOfRule(path, item, type);

    if (findType(type) === 'item'){
      changeToItemRuleRule(
        path,
        {
          [type]: DEF_ITEM
        }
      );
    }
  };

  handleClick = event => this.setState({ open: true, anchorEl: event.currentTarget });

  handleRequestClose = () => this.setState({ open: false });

  onSelected = (item, path, type) => {
    const body = findType(item.value) === 'block' ? { 'match':  {...DEF_ITEM, op: '='}  } :  DEF_ITEM ;
    addRules({
      type: item.value,
      path: `${path}.${type}`,
      body: item.value === 'match' ? {...body, op: '='} : body
    });


    this.handleRequestClose();
  };

  render() {
    const { type, reqType, path, item, step, area, page } = this.props;
    return <div className="rule-block">
      <div className={`nav ${type}`}>
        <TextField
          id={`select-currency`}
          select
          value={type}
          onChange={(event) => this.handleChange(event, path, type)}
          className="types-select"
          margin="normal"
        >
          {checkQuestionType(this.props.page).map((option, index) =>
            (<MenuItem key={index}
                      value={option.value}>
              {option.label}
            </MenuItem>))}
        </TextField>
      </div>
      <div className="rule-block-details">
        {item[type].map((val, i) => {
          const findElement = mathType(val);
          switch(findElement.type) {
            case 'block':
              return <RulesBlockComponent
                        path={`${path}.${type}.${i}`}
                        type={findElement.key}
                        key={i}
                        item={val}
                        reqType={reqType}
                        step={step}
                        area={area}
                        page={page}
                        />;
            case 'item':
              return <RulesItemComponent
                        path={`${path}.${type}.${i}`}
                        key={i}
                        type={findElement.key}
                        item={item}
                        reqType={reqType}
                        step={step}
                        area={area}
                        page={page}
              />;
            default:
              console.log('Wrong type!');
          }})}
        <div className="add-item">
          <Button
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            aria-label="add">
            <AddIcon /> ADD
          </Button>

          <ClickAwayListener
            onClickAway={this.handleRequestClose}>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onRequestClose={this.handleRequestClose}>
              {this.listTypes.map((item, index) =>
                (<MenuItem key={index}
                           onClick={() => this.onSelected(item, path, type)}>
                  {item.label}
                </MenuItem>))}
            </Menu>
          </ClickAwayListener>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  store: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(RulesBlockComponent);
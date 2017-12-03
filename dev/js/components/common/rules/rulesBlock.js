import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import AddIcon                from 'material-ui-icons/Add';
import { RulesItemComponent } from './';
import TextField              from 'material-ui/TextField';
import { changeTypeOfRule }   from '../../../actions';
import Button                 from 'material-ui/Button';
import ClickAwayListener      from 'material-ui/utils/ClickAwayListener';
import Menu, { MenuItem }     from 'material-ui/Menu';
import { mathType, findType } from '../../../utils/matrix';
import { addRules }           from '../../../actions';

const TYPES = [
  {label: 'And',  value: 'and'},
  {label: 'Or',   value: 'or'},
  {label: 'Not',  value: 'not'},
];

const LIST = [
  { label: 'And',        key: 'and' },
  { label: 'Not',        key: 'not' },
  { label: 'Or',         key: 'or' },
  { label: 'Match',      key: 'match' },
  { label: 'Equal',      key: 'equal' },
  { label: 'Not Equal',  key: 'notEqual' },
];

class RulesBlockComponent extends Component {
  state = {
    open: false
  };

  handleChange = (event, path, item) => {
    const type  = event.target.value;
    changeTypeOfRule(path, item, type);
  };

  handleClick = event => this.setState({ open: true, anchorEl: event.currentTarget });

  handleRequestClose = () => this.setState({ open: false });

  onSelected = (item, path, type) => {
    const body = findType(item.key) === 'block' ? [ { 'match': [] } ] : [];
    addRules({
      type: item.key,
      path: `${path}.${type}`,
      body
    });
    this.handleRequestClose();
  };
  render() {
    const { type, path, item } = this.props;
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
          {TYPES.map((option, index) =>
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
                        />;
            case 'item':
              return <RulesItemComponent
                        path={`${path}.${type}.${i}`}
                        key={i}
                        type={findElement.key}
                        item={item}/>;
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
              {LIST.map((item, index) =>
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
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(RulesBlockComponent);
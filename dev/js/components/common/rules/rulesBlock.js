import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import AddIcon                from 'material-ui-icons/Add';
import { RulesItemComponent } from './';
import TextField              from 'material-ui/TextField';
import { changeTypeOfRule }   from '../../../actions';
import Button                from 'material-ui/Button';
import ClickAwayListener     from 'material-ui/utils/ClickAwayListener';
import Menu, { MenuItem }    from 'material-ui/Menu';

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

  onSelected = () => {
    this.handleRequestClose();
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

        {/*<RulesItemComponent/>*/}



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
                           onClick={() => this.onSelected(item)}>
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
import React, { Component }  from 'react';
import { connect }           from 'react-redux';
import Button                from 'material-ui/Button';
import Typography            from 'material-ui/Typography';
import AddIcon               from 'material-ui-icons/Add';
import ClickAwayListener     from 'material-ui/utils/ClickAwayListener';
import Menu, { MenuItem }    from 'material-ui/Menu';
import { addRules }          from '../../../actions';
import {
  checkQuestionType,
  findType
}                             from '../../../utils/matrix';
import {
  TYPES,
  GROUP_TYPES,
  DEF_ITEM
}                             from '../../../utils/matrix';

class RulesQuestionComponent extends Component {
  state = {
    anchorEl: null,
    open: false,
  };
  listTypes = [];

  componentWillMount() {
    this.listTypes = checkQuestionType(this.props.page);
  }

  handleClick = event => this.setState({ open: true, anchorEl: event.currentTarget });

  handleRequestClose = () => this.setState({ open: false });

  onSelected = (item) => {
    const body = findType(item.value) === 'block' ? [ { 'match': [ DEF_ITEM ] } ] : [ DEF_ITEM ];
    addRules({
      type: item.value,
      path: 'rules',
      body
    });
    this.handleRequestClose();
  };

  render() {
    return (
      <div className="rule-question">
        <div className="nav-block">

              <Button
                aria-owns={this.state.open ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                fab
                color="accent"
                aria-label="add"
              >
                <AddIcon />
              </Button>

            <ClickAwayListener
              onClickAway={this.handleRequestClose}>

              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={this.handleRequestClose}
              >
                {this.listTypes.map((item, index) =>
                  (<MenuItem key={index}
                             onClick={() => this.onSelected(item)}>
                    {item.label}
                  </MenuItem>))}
              </Menu>
            </ClickAwayListener>

        </div>
        <div className="question-block">
          <div className="wrap">
            <div className="title">
              <Typography type="caption" gutterBottom>
                Question
              </Typography>
            </div>
            <div className="text">
              {this.props.state.question.en}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state.createDiagnosisQuestion
});

export default connect(mapStateToProps)(RulesQuestionComponent);

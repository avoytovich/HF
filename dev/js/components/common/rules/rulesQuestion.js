import React, { Component }  from 'react';
import { connect }           from 'react-redux';
import Button                from 'material-ui/Button';
import Typography            from 'material-ui/Typography';
import AddIcon               from 'material-ui-icons/Add';
import ClickAwayListener     from 'material-ui/utils/ClickAwayListener';
import Menu, { MenuItem }    from 'material-ui/Menu';
import { addRules }          from '../../../actions';
import { findType }          from '../../../utils/matrix';

class RulesQuestionComponent extends Component {
  list = [
    { label: 'And',        key: 'and' },
    { label: 'Not',        key: 'not' },
    { label: 'Or',         key: 'or' },
    { label: 'Match',      key: 'match' },
    { label: 'Equal',      key: 'equal' },
    { label: 'Not Equal',  key: 'notEqual' },
  ];

  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => this.setState({ open: true, anchorEl: event.currentTarget });

  handleRequestClose = () => this.setState({ open: false });

  onSelected = (item) => {
    const body = findType(item.key) === 'block' ? [ { 'match': [] } ] : [];
    addRules({
      type: item.key,
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
                {this.list.map((item, index) =>
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
              {this.props.state.question}
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

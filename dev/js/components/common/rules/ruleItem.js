import React, { Component }  from 'react';

import Select                from 'react-select';
import Menu, { MenuItem }    from 'material-ui/Menu';
import Button                from 'material-ui/Button';
import MoreVertIcon          from 'material-ui-icons/MoreVert';

class RuleItemComponent extends Component {
  titleType = '';

  state = {
    open: false,
    anchorEl: null,
    disabledAnswer: true,
    questionSelected: '',
    answerSelected: '',
    answer: [
      {value: 'a', label: 'a'},
      {value: 'b', label: 'b'},
      {value: 'c', label: 'c'},
    ],
    navOptions: [
      { label: 'new rule: Add', key: 'add' },
      { label: 'new rule: Or',  key: 'or'  },
      { label: 'new rule: Not', key: 'not' }
    ]
  };

  componentWillMount() {
    this.titleType = this.props.path.reduce((result, item) => {
      if (item && item.key && item.key !== 'match') return item.key;

      return result;
    }, '');

    console.log('titleType', this.titleType);
  }

  handleQuestionChange = (questionSelected) =>
    this.setState({questionSelected});

  handleAnswerChange = (answerSelected) =>
    this.setState({answerSelected});

  getOptions = (input, callback) => {
    setTimeout(() => {
      callback(null, {
        options: [
          { value: 'some text', label: 'some text' },
          { value: 'some text', label: 'some text v2' }
        ],
        complete: true
      });
    }, 500);
  };

  handleClick = (event, key) => this.setState({ open: true, anchorEl: event.currentTarget, key});

  handleRequestClose = (option) => {
    console.log('option', option);
    this.setState({ open: false, anchorEl: null, key: null });
  };


  render() {
    const {open, anchorEl, questionSelected, answerSelected, navOptions, answer} = this.state;

    console.log('props', this.props);

    return  <div className="rules">
    <div className="rules-type">
      {this.titleType}
    </div>

    <div className="rules-question">
      <span className="title">Question</span>
      <Select.Async
        name="type-of-question"
        loadOptions={this.getOptions}
        onChange={this.handleQuestionChange}
        value={questionSelected}
        placeholder="Select question..."
      />
    </div>

    <div className="rules-answer">
      <span className="title">Answers</span>

      <Select
        options={answer}
        simpleValue
        name="selected-state"
        disabled={!questionSelected}
        onChange={this.handleAnswerChange}
        value={answerSelected}
        searchable={true}
      />
    </div>

    <div className="rules-navigation">
      <Button
        aria-owns={open ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={this.handleClick}>

        <MoreVertIcon width="10px" height="10px"/>

      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onRequestClose={this.handleRequestClose}
      >
        {navOptions.map((option, index) =>
          <MenuItem
            key={index}
            onClick={() => this.handleRequestClose(option)}>
            {option.label}
          </MenuItem>)}
      </Menu>
    </div>
  </div>}
}

export default RuleItemComponent;
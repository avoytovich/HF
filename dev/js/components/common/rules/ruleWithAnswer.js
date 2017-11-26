import React, { Component }  from 'react';
import { connect }           from 'react-redux';
import Select                from 'react-select';
import Menu, { MenuItem }    from 'material-ui/Menu';
import Button                from 'material-ui/Button';
import MoreVertIcon          from 'material-ui-icons/MoreVert';


class RulesWithAnswerComponent extends Component {
  innerType = {
    label: null,
    key: null
  };

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





  checkType = (rules) => {
    const isIn = (obj, key) => obj && obj.hasOwnProperty(key);
    switch(true) {
      case isIn(rules, 'not'):
        return { label: 'not', key: 'not' };

      case isIn(rules, 'or'):
        return { label: 'or',  key: 'or' };

      case isIn(rules, 'and'):
        return { label: 'and', key: 'and' };

      case isIn(rules, 'match'):
        return { label: 'and', key: 'match' };

      default:
        return { label: 'and', key: 'and' };
    }
  };

  andRule  = (index, { questionSelected, answer, open, anchorEl, navOptions, answerSelected }, type) => {
   return  <div className={`rules ${this.props.className}`} key={index}>
        <div className="rules-type">
          {type}
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
      </div>};

  showRule = (rules) => {
    if (Array.isArray(rules)) {
      return <div style={{width: '100%'}}>
        { rules.map((item, index) => {
          const checkType = this.checkType(item);

          if (['and', 'not', 'or'].some(el => el === checkType.key)) {
            return <div key={index} className="sub-rules">

                      <div className="sub-rules-title">
                        <span>
                          {this.props.type}
                        </span>
                      </div>

                      {this.defaultResult(item)}

                  </div>;
          }
          else {
            console.log('rules!!', item);
            return this.andRule(index, this.state, this.props.type);
          }
        })}
      </div>
    }
    else {
      return this.defaultResult(rules)
    }
  };

  defaultResult = (rules) => {
    this.innerType = this.checkType(rules);

    switch (this.innerType.key) {
      case 'or':
        return <RulesWithAnswerComponent type="or" rules={rules.or} className="add-margin"/>;

      case 'not':
        return <RulesWithAnswerComponent type="not" rules={rules.not}/>;

      case 'and':
        return <RulesWithAnswerComponent type="and" rules={rules.and}/>;

      default:
        const value = Array.isArray(this.props.rules) ? this.props.rules : [this.props.rules];
        return <div style={{width: '100%'}}>
          { value.map((item, index) => this.andRule(index, this.state, this.props.type)) }
        </div>
    }
  };

  render() {
    return (
      <div className="rulesWithAnswer">
        {this.showRule(this.props.rules)}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});
export default  connect(mapStateToProps)(RulesWithAnswerComponent);

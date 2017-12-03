import React, { Component }  from 'react';
import { connect }           from 'react-redux';
import RuleItemComponent     from './hhhITEM';
import { checkType }         from '../../../utils';



class RulesWithAnswerComponent extends Component {

  checkPath = ({key}, index) => {
    return key ? this.props.path.concat({key}) : this.props.path.concat({index});
  };

  showRule = (rules) => {
    if (Array.isArray(rules)) {
      return rules.map((item, index) =>
        (<RulesWithAnswerComponent
          key={index}
          rules={item}
          path={this.checkPath(item, index)}
          className="sub-title-rule"/>));
    }
    else {
      const type = checkType(rules);

      const matchInside = rules[type.key].every(item => item.hasOwnProperty('match'));
      return type.key === 'match' ?
          <RuleItemComponent
            rules={rules.match}
            path={this.checkPath(type)}
          />
        :
        <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
          { type.label === 'or' &&
            <div className="sub-rules">
              {!matchInside && <div className="sub-rules-title">
                {type.label}
              </div>}
            </div>}

            <RulesWithAnswerComponent
              rules={rules[type.key]}
              className="sub-title-rule"
              path={this.checkPath(type)}
            />
        </div>
    }
  };

  render() {
    return (
      <div className={`rulesWithAnswer ${this.props.className ? this.props.className : ''}`}>
        {this.showRule(this.props.rules)}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(RulesWithAnswerComponent);




//
//andRule  = (index, { questionSelected, answer, open, anchorEl, navOptions, answerSelected }, type) => {
//  return  <div className={`rules ${this.props.className}`} key={index}>
//    <div className="rules-type">
//      {type}
//    </div>
//
//    <div className="rules-question">
//      <span className="title">Question</span>
//      <Select.Async
//        name="type-of-question"
//        loadOptions={this.getOptions}
//        onChange={this.handleQuestionChange}
//        value={questionSelected}
//        placeholder="Select question..."
//      />
//    </div>
//
//    <div className="rules-answer">
//      <span className="title">Answers</span>
//
//      <Select
//        options={answer}
//        simpleValue
//        name="selected-state"
//        disabled={!questionSelected}
//        onChange={this.handleAnswerChange}
//        value={answerSelected}
//        searchable={true}
//      />
//    </div>
//
//    <div className="rules-navigation">
//      <Button
//        aria-owns={open ? 'simple-menu' : null}
//        aria-haspopup="true"
//        onClick={this.handleClick}>
//
//        <MoreVertIcon width="10px" height="10px"/>
//
//      </Button>
//
//      <Menu
//        id="simple-menu"
//        anchorEl={anchorEl}
//        open={open}
//        onRequestClose={this.handleRequestClose}
//      >
//        {navOptions.map((option, index) =>
//          <MenuItem
//            key={index}
//            onClick={() => this.handleRequestClose(option)}>
//            {option.label}
//          </MenuItem>)}
//      </Menu>
//    </div>
//  </div>};
//
//showRule = (rules) => {
//  if (Array.isArray(rules)) {
//    return <div style={{width: '100%'}}>
//      { rules.map((item, index) => {
//        const checkType = this.checkType(item);
//
//        if (['and', 'not', 'or'].some(el => el === checkType.key)) {
//          return <div key={index} className="sub-rules">
//
//            <div className="sub-rules-title">
//                        <span>
//                          {this.props.type}
//                        </span>
//            </div>
//
//            {this.defaultResult(item)}
//
//          </div>;
//        }
//        else {
//          console.log('rules!!', item);
//          return this.andRule(index, this.state, this.props.type);
//        }
//      })}
//    </div>
//  }
//  else {
//    return this.defaultResult(rules)
//  }
//};
//
//defaultResult = (rules) => {
//  this.innerType = this.checkType(rules);
//
//  switch (this.innerType.key) {
//    case 'or':
//      return <RulesWithAnswerComponent type="or" rules={rules.or} className="add-margin"/>;
//
//    case 'not':
//      return <RulesWithAnswerComponent type="not" rules={rules.not}/>;
//
//    case 'and':
//      return <RulesWithAnswerComponent type="and" rules={rules.and}/>;
//
//    default:
//      const value = Array.isArray(this.props.rules) ? this.props.rules : [this.props.rules];
//      return <div style={{width: '100%'}}>
//        { value.map((item, index) => this.andRule(index, this.state, this.props.type)) }
//      </div>
//  }
//};

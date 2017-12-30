import React, { Component }  from 'react';
import { connect }           from 'react-redux';
import {
  RulesQuestionComponent,
  RulesBlockComponent,
  RulesItemComponent
}                            from '../rules';
import { mathType }          from '../../../utils/matrix';

class DiagnosisRulesComponent extends Component {
  state = {
    anchorEl: null,
    open: false,
    key: null
  };

  handleClick = (event, key) =>
    this.setState({ open: true, anchorEl: event.currentTarget, key});

  handleRequestClose = (option) => {
    this.setState({ open: false, anchorEl: null, key: null });
  };

  showRule = (rules) => {
    const isIn = (obj, key) => obj && obj.hasOwnProperty(key);

    switch(true) {
      case isIn(rules, 'not'):
        return rules.not.map((item, index) =>
          <RulesWithAnswerComponent
            key={index}
            rules={item}
            path={[ {key:'not'} ]}
          />);

      case isIn(rules, 'or'):
        return rules.or.map((item, index) =>
          <RulesWithAnswerComponent
            key={index}
            rules={item}
            path={[ {key:'or'} ]}
          />);

      case isIn(rules, 'and'):
        return rules.and.map((item, index) =>
            <RulesWithAnswerComponent
              key={index}
              rules={item}
              path={[ {key:'and'} ]}
            />);

      default:
        console.log('Wrong type!');
    }
  };


  render() {
    const { rules } = this.props.createDiagnosisQuestion;
    const {type, step, area, URL, page, showTitle} = this.props;
    return (
      <div className="rules-block">

        <div className="vertical-line"></div>

        <RulesQuestionComponent page={page} showTitle={showTitle} />

        <div className="items">
          {rules.map((item, index) => {
            const findElement = mathType(item);

            switch (findElement.type) {
              case 'block':
                return <RulesBlockComponent
                            path={`rules.${index}`}
                            key={index}
                            type={findElement.key}
                            item={item}
                            reqType={type}
                            step={step}
                            url={URL}
                            area={area}
                            page={page}/>;
                break;
              case 'item':
                return <RulesItemComponent
                            path={`rules.${index}`}
                            key={index}
                            type={findElement.key}
                            item={item}
                            reqType={type}
                            step={step}
                            url={URL}
                            area={area}
                            page={page}/>;
                break;
              default:
                return '';
            }
          })}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  commonReducer: state.commonReducer,
  createDiagnosisQuestion: state.createDiagnosisQuestion
});
export default  connect(mapStateToProps)(DiagnosisRulesComponent);


import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import RulesWithAnswerComponent from '../../../common/rules/ruleWithAnswer'
import Menu, { MenuItem }       from 'material-ui/Menu';
import Button                   from 'material-ui/Button';
import MoreVertIcon             from 'material-ui-icons/MoreVert';
import { checkType }            from '../../../../utils';

import { isNot, andV1, mixid } from './rulesTemplate';


class DiagnosisRulesComponent extends Component {
  options = [
    { label: 'Add', key: 'add' },
    { label: 'Or',  key: 'or'  },
    { label: 'Not', key: 'not' }
  ];

  state = {
    anchorEl: null,
    open: false,
    key: null
  };

  handleClick = (event, key) =>
    this.setState({ open: true, anchorEl: event.currentTarget, key});

  handleRequestClose = (option) => {
    console.log('option', option);
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
    return (
      <div className="rules-wrap">
        <div className="rules rules-main-question">
            <input type="text" value={'some text'} disabled/>
            <Button
              aria-owns={this.state.open ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}>

              <MoreVertIcon />

            </Button>

            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onRequestClose={this.handleRequestClose}
            >
              {this.options.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => this.handleRequestClose(option)}>
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
        </div>
        {this.showRule(andV1)}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});
export default  connect(mapStateToProps)(DiagnosisRulesComponent);


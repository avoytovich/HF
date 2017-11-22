import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import Select from 'react-select';

// UI
import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
import { GridList } from 'material-ui/GridList';
import SvgIcon from 'material-ui/SvgIcon';



class CreateQuestionComponent extends Component {
  state = {
    backPath: '',
    answer: [1,2,3]
  };

  getOptions = (input, callback) => {
    setTimeout(() => {
      callback(null, {
        options: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' }
        ],
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      });
    }, 500);
  };

  done = () => {
    console.log('this.props', this.props);
    this.props.router.goBack();
//    browserHistory.push(`/${this.state.backPath}`);
  };

  cancel = () => {
    this.props.router.goBack();
//    browserHistory.push(`/${this.state.backPath}`);
  };

  onChange = () => {}

  addAnswer = () => {
    const answer = this.state.answer.concat(1);
    this.setState({answer})
  }

  render() {
    return (
      <div id="create-question">
        <Subheader className="page-sub-header">
          <span>Create Question</span>
          <div className="nav-buttons">
            {/*<RaisedButton label="Cancel" className="page-navigation-button" onClick={() => this.cancel()}/>*/}
            {/*<RaisedButton label="Done"   className="page-navigation-button" onClick={() => this.done()} />*/}
          </div>
        </Subheader>

        <GridList cols={2} className="create-question-body" cellHeight="auto">
          <div className="main-question">
            <div className="title">
                <div>Question</div>

                <SvgIcon className="size-buttons">
                  <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                  <path d="M0-.5h24v24H0z" fill="none"/>
                </SvgIcon>

              {false &&
                <SvgIcon className="size-buttons">
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                  <path d="M0-.25h24v24H0z" fill="none"/>
                </SvgIcon>}
            </div>

            <div className="item-wrap-column">
              <span className="label-text">Type of Question</span>
              <Select.Async
                name="type-of-question"
                loadOptions={this.getOptions}
                onChange={this.onChange}
              />
            </div>
            
            <div className="item-wrap-column">
              <span className="label-text">Type of Question</span>

              <div className="sub-item-wrap">
                <input type="text" className="Input-ui"/>
                {/*<RaisedButton label="+ Add"   className="page-navigation-button" onClick={() => this.done()} />*/}
              </div>

            </div>

            <div className="item-wrap-column">
              <span className="label-text">Type of Question</span>
              <textarea className="Input-ui question-context"/>
            </div>

            <div className="item-wrap-row">

              <div className="item-wrap">
                <span className="label-text">Question Key</span>

                <Select.Async
                  name="type-of-question"
                  loadOptions={this.getOptions}
                  onChange={this.onChange}
                />
              </div>

              <div className="item-wrap">

                <span className="label-text">Sequence</span>
                <input type="number" className="Input-ui"/>
              </div>
            </div>

            <br/>

            <div className="title">
              Answers
            </div>

            <div className="item-wrap-column">
              <span className="label-text">Type of Answer</span>
              <div className="item-wrap-row margin-top-remove">
                {/*<RaisedButton label="Single"     className="page-navigation-button"/>*/}
                {/*<RaisedButton label="Continuous" className="page-navigation-button"/>*/}
                {/*<RaisedButton label="Multiple"   className="page-navigation-button"/>*/}
              </div>
            </div>

            <br/>

            <span className="label-text">Answers</span>

            <div className="item-wrap-column margin-top-remove">

              {this.state.answer.map((item, i) =>
                <div className="item-wrap-row" key={i} >
                  <div>{i + 1}</div>
                  <input type="string" className="Input-ui "/>
                </div>
               )}

              {/*<RaisedButton label="+ Add Answer"*/}
                            {/*className="page-navigation-button margin-top"*/}
                            {/*onClick={this.addAnswer}/>*/}
            </div>

          </div>

          <div className="rules">
            Rules
          </div>
        </GridList>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(CreateQuestionComponent);

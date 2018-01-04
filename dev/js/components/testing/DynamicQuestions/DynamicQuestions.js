import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import each from 'lodash/each';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';

import { C } from '../../../components'
import { dispatchTestingPayloadWired } from '../../../actions'

class DynamicQuestions extends Component {
  _pickQuestion = ({ answer: { type, subtype, values }, question, key, content_type }, i) => {
    const { testingReducer } = this.props;
    switch (type) {
      case 'single':
        if (subtype === 'list') {
          let items = [];
          each(values, (val, answerId) => items.push({ label: val.en, value: answerId }));
          return (
            <C.RadioButton
              key={i}
              items={items}
              reducer={testingReducer}
              id={key}
              label={question.en}
            />
          );
        } else {
          const { min, max } = values;
          return (
            <div className="margin-range">
              <C.Range
                key={i}
                reducer={testingReducer}
                id={`${key}.value`}
                label={question.en}
                onChangeCustom={({ target: { value }}) => {
                  const valueWithinRange = Math.ceil((value / 100) * (+max - +min)) + +min;
                  dispatchTestingPayloadWired({
                    [`${key}.type`]       : 'single',
                    [`${key}.value`]      : valueWithinRange,
                    [`${key}.valueOrigin`]: value,
                  })
                }}
              />
            </div>
          );
        }

      case 'multiple':
        if (content_type === 'vas') {
          const bodyAreas = [];
          each(values, (val, value) => bodyAreas.push({ label: val.en, value }));
          return (
            <C.BodyAreas
              key={i}
              id={key}
              areas={bodyAreas}
            />
          );
        } else {
          let itemsMultiple = [];
          each(values, (val, answerId) => itemsMultiple.push({ label: val.en, answerId }));
          return (
            <C.CheckBox
              key={i}
              items={itemsMultiple}
              reducer={testingReducer}
              id={key}
              label={question.en}
            />
          );
        }

      default:
        console.log('default fired: ', { type, subtype });
    }
  };

  _renderQuestions = (questions) => {
    return questions.map((que, i) => {
      return this._pickQuestion(que, i)
    })
  };

  render() {
    const {
      testingReducer: {
        questions,
      }
    } = this.props;
    return questions.length ?
      (
        <div>
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <div className="testing-inner-container-long">
                <p className="testing-inner-sub-header">
                  Conditions & Treatment
                </p>
              </div>
            </Grid>

            <Grid item xs={5}>
              <div className="testing-inner-container-long">
                <p className="testing-inner-sub-header">
                  Questions
                </p>

                { this._renderQuestions(questions) }

              </div>
            </Grid>
          </Grid>
        </div>
      ) :
      null;
  }
}

DynamicQuestions.propTypes = {};

DynamicQuestions.defaultProps = {};

const mapStateToProps = state => ({
  testingReducer: state.testingReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DynamicQuestions);
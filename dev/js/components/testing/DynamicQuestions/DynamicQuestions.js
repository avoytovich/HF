import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import each from 'lodash/each';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';
import InsertDriveFile from 'material-ui-icons/InsertDriveFile';

import { C } from '../../../components'
import {
  dispatchTestingPayloadWired,
  onChange,
} from '../../../actions'

class DynamicQuestions extends Component {
  _pickQuestion = (
    {
      answer,
      answer: {
        type,
        subtype,
        values
      },
      question,
      key,
      content_type,
      description,
      step,
    },
    i
  ) => {

    const {
      testingReducer,
      onChange,
    } = this.props;

    switch (type) {
      case 'single':
        if (content_type === 'functionalTest') {
          let items = [];
          each(values, (val, answerId) => items.push({ label: val.en, value: answerId }));
          return (
            <div key={i}>
              <h5>Question { step }</h5>
              <h4>Functional test</h4>
              <div>
                <InsertDriveFile className="testing-file-icon"/>
              </div>
              {
                description &&
                <p>{ description }</p>
              }
              <C.RadioButton
                key={i}
                items={items}
                onChangeCustom={(e) => {
                  onChange(e);
                  dispatchTestingPayloadWired({
                    [`${key}.type`]     : 'single',
                    changingQuestionStep: step,
                  })
                }}
                reducer={testingReducer}
                id={key}
                label={question.en}
              />
            </div>
          );
        } else if (subtype === 'list') {
          let items = [];
          each(values, (val, answerId) => items.push({ label: val.en, value: answerId }));
          return (
            <div key={i}>
              <h5>Question { step }</h5>
              <C.RadioButton
                key={i}
                items={items}
                onChangeCustom={(e) => {
                  onChange(e);
                  dispatchTestingPayloadWired({
                    [`${key}.type`]     : 'single',
                    changingQuestionStep: step,
                  })
                }}
                reducer={testingReducer}
                id={key}
                label={question.en}
              />
            </div>
          );
        } else {
          //TODO check with backend regarding nesting of the min/max values
          let min, max;
          if (values) {
            min = values.min || 0;
            max = values.max || 100;
          } else {
            min = answer.min || 0;
            max = answer.max || 100;
          }
          return (
            <div key={i} className="margin-range">
              <h5>Question { step }</h5>
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
                    changingQuestionStep  : step,
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
            <div key={i}>
              <h5>Question { step }</h5>
              <C.BodyAreas
                key={i}
                step={step}
                id={key}
                areas={bodyAreas}
              />
            </div>
          );
        } else {
          let itemsMultiple = [];
          each(values, (val, answerId) => itemsMultiple.push({ label: val.en, answerId }));
          return (
            <div key={i}>
              <h5>Question { step }</h5>
              <C.CheckBox
                key={i}
                step={step}
                items={itemsMultiple}
                reducer={testingReducer}
                id={key}
                label={question.en}
              />
            </div>
          );
        }

      default:
        console.log('default fired: ', { type, subtype });
        // throw new Error('unpredicted question type');
    }
  };

  _renderQuestions = (questions) => {
    return questions.map((q, i) => {
      return this._pickQuestion(q, i)
    })
  };

  _renderConditions = (conditions, step) => {
    return conditions.map(({ title }, i) => {
      return (
        <C.Paper
          key={i}
          step={step}
          conditionText={title}
        />
      )
    })
  };

  render() {
    const {
      testingReducer: {
        questions,
        conditions,
        step,
        result_status,
        condition = { title: 'Condition Fired' },
      }
    } = this.props;
    const questionToRender = questions.filter(q =>
      !['q_lang', 'q_metric', 'q_age', 'q_sex', 'q_weight', 'q_height', 'q_pregnant']
        .find(key => key === q.key)
    );

    return questions.length ?
      (
        <div>
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <div className="testing-inner-container-long">
                <h2 className="testing-inner-sub-header">
                  Conditions & Treatment
                </h2>

                { this._renderConditions(conditions, step) }

              </div>
            </Grid>

            <Grid item xs={5}>
              <div className="testing-inner-container-long">
                <h2 className="testing-inner-sub-header">
                  Questions
                </h2>

                { this._renderQuestions(questionToRender) }

              </div>
            </Grid>

            {
              result_status &&
              <div className="border-top" style={{ width: '100%' }} >
                <Grid container spacing={0}>
                  <Grid item xs={5}>

                    <C.Result
                      condition={condition}
                      result={result_status}
                      label={result_status}
                    />

                  </Grid>
                </Grid>
              </div>
            }

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
  onChange,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DynamicQuestions);
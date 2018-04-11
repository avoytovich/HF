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
import { pickKeys } from '../../../config'

class DynamicQuestions extends Component {
  _pickQuestion = (questionObj, i) => {
    const {
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
    } = questionObj;

    const {
      testingReducer,
      onChange,
    } = this.props;

    const stepToShow = i + 1;

    switch (type) {
      case 'single':
        if (content_type === 'functionalTest') {
          let items = [];
          each(values, (val, answerId) => items.push({ label: val.en, value: answerId }));
          return (
            <div key={i}>
              <h5>Question { stepToShow }</h5>
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
              <h5>Question { stepToShow }</h5>
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
              <h5>Question { stepToShow }</h5>
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
              <h5>Question { stepToShow }</h5>
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
              <h5>Question { stepToShow }</h5>
              <C.CheckBox
                key={i}
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

  _renderQuestions = questions => questions
    .sort((qs1, qs2) => qs1.step > qs2.step)
    .map(this._pickQuestion);

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
        treatments = [],
      }
    } = this.props;

    // filters out 0-level questions when they're coming from backend.
    // keys of that questions can be found here - pickKeys.testing (see variable below)
    // const questionsToRender = questions.filter(q => !pickKeys.testing.find(key => key === q.key));
    const questionsToRender = questions.filter(q => !pickKeys.testing.find(key => key === q.key));

    return questions.length || result_status ?
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

                { this._renderQuestions(questionsToRender) }

              </div>
            </Grid>

            {
              result_status &&
              <div className="border-top" style={{ width: '100%' }} >
                <Grid container spacing={0}>
                  <Grid item xs={5}>

                    <C.Result
                      condition={condition}
                      treatments={treatments}
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
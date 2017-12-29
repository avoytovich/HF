import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import each from 'lodash/each';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';

import RadioButton from '../../common/RadioButton/RadioButton';
import CheckBox from '../../common/CheckBox/CheckBox';
import Range from '../../common/Range/Range';
import BodyAreas from '../../testing/BodyAreas/BodyAreas';

class DynamicQuestions extends Component {
  _pickQuestion = ({ answer: { type, subtype, values }, question, key, content_type }, i) => {
    switch (type) {
      case 'single':
        let items = [];
        each(values, (val, prop) => items.push({ label: val.en,  value: prop }));
        return (
          <RadioButton
            items={items}
            reducer={this.props.testingReducer}
            id={key}
            label={question.en}
          />
        );

      case 'multiple':
        if (content_type === 'vas') {
          return <BodyAreas />;
        }
        let itemsMultiple = [];
        each(values, (val, prop) => itemsMultiple.push({ label: val.en,  value: prop }));
        return (
          <CheckBox
            items={itemsMultiple}
            reducer={this.props.testingReducer}
            id={key}
            label={question.en}
          />
        )

      case 'range':
        console.log('range: ', { type, subtype, values, question, key });
        return (
          <Range
            items={itemsMultiple}
            reducer={this.props.testingReducer}
            id={key}
            label={question.en}
            range={values}
          />
        );

      default:
        console.log('default: ', { type, subtype });
    }
  };

  _renderQuestions = (questions) => {
    return questions.map((que, i) => {
      return this._pickQuestion(que, i)
    })
  };

  render() {
    const {
      testingReducer,
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';

import RadioButton from '../../common/RadioButton/RadioButton';
import CheckBox from '../../common/CheckBox/CheckBox';

class DynamicQuestions extends Component {
  _pickQuestion = ({ type, subtype, ...props }, i) => {
    switch (type) {
      case 'single':
        console.log({ type, subtype, ...props });
        return (
          <RadioButton
            items={[]}
            reducer={this.props.testingReducer}
            id='id'
            label="lable"
          />
        );

      case 'multiple':
        console.log({ type, subtype, ...props });
        return <span key={i} >list</span>;

      case 'range':
        console.log({ type, subtype, ...props });
        return <span key={i} >range</span>;

      default:
        return console.log('default: ', { type, subtype, props });
    }
  };

  _renderQuestions = (questions) => {
    return questions.map((que, i) => {
      return this._pickQuestion(que.answer, i)
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
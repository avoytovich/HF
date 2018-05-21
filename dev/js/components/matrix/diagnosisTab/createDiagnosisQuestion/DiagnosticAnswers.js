//diagnosticAnswers
import React, { Component }           from 'react';
import { connect }                    from 'react-redux';
import { bindActionCreators }         from 'redux';
import PropTypes                      from 'prop-types';

// Actions
import {
  updateCrateQuestionFields,
  removeAnswer,
  addNewAnswer
}                                   from '../../../../actions';

// Components
import Input                        from '../../../common/Input/Input';

// UI
import Grid                         from 'material-ui/Grid';
import Radio                        from 'material-ui/Radio';
import Tabs, { Tab }                from 'material-ui/Tabs';
import Typography                   from 'material-ui/Typography';
import AddIcon                      from 'material-ui-icons/Add';
import Clear                        from 'material-ui-icons/Clear';
import {
  FormControlLabel,
  FormGroup
}                                   from 'material-ui/Form';

const ANSWER_TYPE = [
  {label: 'Single',   value: 'single'},
  {label: 'Range',    value: 'range'},
  {label: 'Multiple', value: 'multiple'},
];

class DiagnosticAnswers extends Component {
  addAnswer = (value) => addNewAnswer(value);

  answers = (type) => {
    const {
      store,
      store: {
        single,
        multiple,
        questionAnswerLang,
      }
    } = this.props;

    switch (type) {
      case 'range':
        return <div className="answer-wrap range">
          <Typography type="title" gutterBottom>
            From
          </Typography>

          <Input
            id='range.from'
            type='number'
            className="MUIControl"
            reducer={store}
          />

          <Typography type="title" gutterBottom className="range-to">
            To
          </Typography>

          <Input
            id='range.to'
            type='number'
            className="MUIControl"
            reducer={store}
          />
        </div>;

      default:
        return <div className="answer-wrap">
          <ol style={{width: '100%'}}>
            {
              single.map((answer, index) => {
                return (
                  <li  key={index} className="row-item">
                    <div className="answer-item">
                      <Input
                        id={`single.${index}.${questionAnswerLang}`}
                        reducer={store}
                        className="MUIControl"
                      />
                      <Clear onClick={() => removeAnswer('single', index)}/>
                    </div>
                  </li>
                )
              })
            }
          </ol>
          <div
            className="add-answer"
            onClick={() => this.addAnswer('single')}
          >
            <AddIcon /> ADD ANSWER
          </div>
        </div>;
    }
  };

  render() {
    const { answerType, typePath } = this.props;

    return <div>
      <FormGroup>
        <Grid container className="row-item">
          {
            ANSWER_TYPE.map((item, index) => (
              <Grid item xs={4} key={index}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={answerType === item.value}
                      onChange={e => updateCrateQuestionFields(e.target.value, typePath)}
                      value={item.value}
                      aria-label={item.value}
                    />
                  }
                  label={item.label}
                />
                </Grid>
              ))
          }
        </Grid>
      </FormGroup>
      <Grid container className="row-item">
        {this.answers(answerType)}
      </Grid>
    </div>
  }
}

DiagnosticAnswers.defaultProps = {
  className : '',
};

DiagnosticAnswers.propTypes = {
  answerType  : PropTypes.string.isRequired,
  typePath    : PropTypes.string.isRequired,
  className   : PropTypes.string
};

const mapStateToProps    = state => ({store: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticAnswers);
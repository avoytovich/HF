import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import Select                       from 'react-select';
import DiagnosisRulesComponent      from './diagnosisRules';
import { browserHistory }           from 'react-router'
import { genCharArray }             from '../../../../utils';
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  findArea }                        from '../../../../actions';
import { AsyncCreatable }           from 'react-select';

// UI
import Grid                     from 'material-ui/Grid';
import Button                   from 'material-ui/Button';
import Typography               from 'material-ui/Typography';
import TextField                from 'material-ui/TextField';
import Radio                    from 'material-ui/Radio';
import Input                    from '../../../common/Input/Input';
import { FormControlLabel,
         FormGroup }            from 'material-ui/Form';


class CreateQuestionComponent extends Component {
  state = {
    questionType: 'Diagnosis',
    backPath: '',
    answer: [1,2,3],
    sequenceType: [
      {label: 'Normal', value: ''},
      {label: 'After',  value: 'after'},
      {label: 'Before', value: 'before'},

    ],
    selectedValue: 'single',
    answerType: [
      {label: 'Single',   value: 'single'},
      {label: 'Range',    value: 'range'},
      {label: 'Multiple', value: 'multiple '},
    ]
  };

  componentWillUnmount() { clearCreateQuestion(); }

  getOptions = (input) => {
    return findArea('diagnostics', 'findArea').then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.title }));
      return {
        options: _data,
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      }
    });
  };

  done = (value) => {
    const result = {
      type : 'diagnostic',
      key  : value.questionKey,
      step : value.sequence,
      area : value.bodyAreas.key,
      title: 'new One',
      question: {
        en: value.question
      },
      answer: {
        type: value.answerType,
        values: this.getAnswer(value.answerType, value)
      },
      rule: {}
    };

    diagnosisQuestionCreate('diagnostics', 'diagnosis', result)
      .then(() => browserHistory.push(`/matrix-setup/diagnosis`));
  };

  getAnswer = (type, obj) => {
    const letters      = genCharArray();
    const correctValue = obj[type];
    return Object.keys(correctValue).reduce((result, item, index) => {
      if (item) {
        const key   = letters[index];
        const value = correctValue[item];
        return Object.assign({}, result, { [key]:  value})
      }
      return result
    }, {});
  };

  cancel = () => browserHistory.push(`/matrix-setup/diagnosis`);

  onAreasChange = (value) => {
    updateCrateQuestionFields(value, 'bodyAreas')
  };

  addAnswer = () => {
    const answer = this.state.answer.concat(1);
    this.setState({answer})
  };

  render() {

    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        bodyAreas,
        question,
        questionKey,
        sequence,
        enterSequence,
        sequenceProp,
        answerType,
        single,
        multiple,
        range,
        answer,
        enterAnswer,
        rules,
        questionTitle
      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
    } = this.props;

    return (
      <div id="create-question">
        <div className="page-sub-header">
          <span>Create Question</span>
          <div className="nav-buttons">

            <Button onClick={this.cancel}>
              Cancel
            </Button>

            <Button raised
                    dense
                    onClick={() => this.done(createDiagnosisQuestion)}
                    color="primary">
              Save
            </Button>

          </div>
        </div>
        <Grid container className="margin-remove">

          <Grid item
                md={6}
                sm={12}
                className="create-question-body">

            <div className="main-question">
              <Grid className="title">
                <Typography type="title" gutterBottom>
                  Question
                </Typography>
              </Grid>

              <Grid container className="row-item">
                <Grid item
                       md={6}
                       sm={12}>
                  <Input
                    id='questionTitle'
                    value={questionTitle}
                    reducer={createDiagnosisQuestion}
                    label={ L_CREATE_QUESTION.question }
                    placeholder={ L_CREATE_QUESTION.enterQuestion }
                  />
                </Grid>

                <Grid item
                       md={6}
                       sm={12}>

                  <Typography
                    type="caption"
                    gutterBottom>
                    Body Areas
                  </Typography>

                  <AsyncCreatable
                      name="body-areas"
                      loadOptions={this.getOptions}
                      onChange={this.onAreasChange}
                      value={bodyAreas}/>

                </Grid>

              </Grid>

              <Grid container className="row-item">
                <Grid item xs={12}>
                  <Input
                    id='question'
                    value={question}
                    reducer={createDiagnosisQuestion}
                    label={ L_CREATE_QUESTION.question }
                    placeholder={ L_CREATE_QUESTION.enterQuestion }
                    multiline={true}
                    rows="5"
                    cols="60"
                  />
                </Grid>
              </Grid>


              <Grid container className="row-item">
                <Grid item xs={12}>
                  <Input
                    id='questionKey'
                    value={questionKey}
                    reducer={createDiagnosisQuestion}
                    label={ L_CREATE_QUESTION.questionKey }
                    placeholder={ L_CREATE_QUESTION.enterQuestionKey }
                  />
                </Grid>
              </Grid>

              <Grid container  className="row-item">
                <Grid item xs={6}>
                  <Input
                    select={true}
                    id='sequenceProp'
                    value={sequenceProp}
                    reducer={createDiagnosisQuestion}
                    label={ L_CREATE_QUESTION.sequence }
                    placeholder={ L_CREATE_QUESTION.enterQuestionKey }
                    currencies={this.state.sequenceType}
                  />
                </Grid>

                <Grid item xs={2}>
                  <Input
                    id='sequence'
                    type="number"
                    value={sequence}
                    reducer={createDiagnosisQuestion}
                    label={ L_CREATE_QUESTION.sequence }
                    placeholder={ L_CREATE_QUESTION.enterSequence }
                  />
                </Grid>
              </Grid>


              <Grid className="title answer">
                <Typography type="title"
                            gutterBottom>
                  Answers
                </Typography>
              </Grid>

              <FormGroup>
                <Grid container className="row-item">
                  {this.state.answerType.map((item, index) =>
                    (<Grid item xs={4} key={index}>
                      <FormControlLabel
                        control={<Radio
                          checked={answerType === item.value}
                          onChange={() => {}}
                          value={item.value}
                          aria-label={item.value}
                        />}
                        label={item.label} />
                      </Grid>)
                  )}
                </Grid>
              </FormGroup>

              <Grid container className="row-item">
                <ol type="A" style={{width: '100%'}}>
                {single.map((answer, index) => (
                  <li  key={index} className="row-item">
                    <Grid item xs={12}>
                      <Input
                        id={`single[${index}]`}
                        reducer={createDiagnosisQuestion}
                        label={ L_CREATE_QUESTION.answer }
                        placeholder={ L_CREATE_QUESTION.enterAnswer }
                      />
                    </Grid>
                  </li>))}
                </ol>
              </Grid>

            </div>
          </Grid>

          <Grid item
                md={6}
                sm={12}
                className="rules">

            <DiagnosisRulesComponent/>

          </Grid>

        </Grid>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  commonReducer          : state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateQuestionComponent);
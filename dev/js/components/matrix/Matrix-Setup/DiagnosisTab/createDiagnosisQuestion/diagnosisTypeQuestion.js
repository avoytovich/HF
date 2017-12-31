import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import PropTypes                    from 'prop-types';

//Library
import { get }                      from 'lodash';

// Actions
import {
  updateCrateQuestionFields,
  findUniqueKey,
  addNewAnswer,
  removeAnswer
}                                   from '../../../../../actions';
import { onChange }                 from '../../../../../actions/common';
import Input                        from '../../../../common/Input/Input';
import {
  DiagnosisAssets,
  DiagnosisRulesComponent,
  AsyncAreaSelect
}                                   from '../../../../common';
import SequenceBlock                from './sequenceBlock';
import DiagnosticQuestion           from './diagnosticQuestion'
// UI
import Grid                         from 'material-ui/Grid';
import Typography                   from 'material-ui/Typography';
import MUISelect                    from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import { Async }                    from 'react-select';
import Tabs, { Tab }                from 'material-ui/Tabs';
import { FormControlLabel,
  FormGroup }                from 'material-ui/Form';
import Radio                        from 'material-ui/Radio';
import AddIcon                      from 'material-ui-icons/Add';
import Clear                        from 'material-ui-icons/Clear';



class DiagnosisTypeQuestion extends Component {
  state = {
    questionType    : 'diagnosis',
    answer          : [1,2,3],
    selectedValue   : 'single',
    answerType      : [
      {label: 'Single',   value: 'single'},
      {label: 'Range',    value: 'range'},
      {label: 'Multiple', value: 'multiple'},
    ],
    content_type_list : [
      {label: 'Question',        value: 'question'},
      {label: 'Functional test', value: 'functionalTest'},
    ],
    answerLang      : ['en', 'en'],
    keyIsUniqueError: '',
  };

  checkIfQuestionKeyValid = (event, value) => {
    this.props.onChange(event, value);

    if (event.target.value.length > 3) {
      findUniqueKey('diagnostics', 'findByKey', event.target.value).then(res => {
        if (res) {
          this.setState({keyIsUniqueError: 'Key is not Unique'});
        }
        else if (!res && this.state.keyIsUniqueError){
          this.setState({keyIsUniqueError: ''});
        }
      });
    }
  };

  handleAnswerLangChange = (value, index) => {
    const state = this.state.answerLang;
    const _value = state.map((el, i) => {
      if (i === index) return value;

      return el ;
    });
    this.setState({ answerLang: _value });
  };

  addNewAnswer = (value) => {
    const inState = this.state.answerLang;
    this.setState({ answerLang: inState.concat('en')});
    addNewAnswer(value);
  };

  answers = (type) => {
    const { single, multiple } = this.props.createDiagnosisQuestion;

    switch (type) {
      case 'single':
        return <div className="answer-wrap">
          <ol type="A" style={{width: '100%'}}>
            {single.map((answer, index) => (
              <li  key={index} className="row-item">
                <div className="answer-item">
                  <Input
                    id={`single[${index}][${this.state.answerLang[index]}]`}
                    reducer={this.props.createDiagnosisQuestion}
                    className="MuiFormControl-CUSTOM"
                  />
                  <Clear onClick={() => removeAnswer(type, index)}/>
                </div>
                <Tabs
                  value={this.state.answerLang[index] || 'en'}
                  onChange={(event, value) => this.handleAnswerLangChange(value, index)}
                  indicatorColor="primary"
                  className="tab-lang answer"
                  textColor="primary"
                  centered
                >
                  <Tab label="English" value="en"/>
                  <Tab label="Sweden"  value="swe" />
                </Tabs>
              </li>))}
          </ol>
          <div className="add-answer"
               onClick={() => this.addNewAnswer('single')}>
            <AddIcon /> ADD ANSWER
          </div>
        </div>;

      case 'range':
        return <div className="answer-wrap range">

          <Typography type="title" gutterBottom>
            From
          </Typography>

          <Input
            id='range.from'
            type='number'
            reducer={this.props.createDiagnosisQuestion}
          />

          <Typography type="title" gutterBottom className="range-to">
            To
          </Typography>

          <Input
            id='range.to'
            type='number'
            reducer={this.props.createDiagnosisQuestion}
          />

        </div>;

      default:
        return <div className="answer-wrap">
          <ol type="A" style={{width: '100%'}}>
            {multiple.map((answer, index) => (
              <li  key={index} className="row-item">

                <div className="answer-item">
                  <Input
                    id={`multiple[${index}].${this.state.answerLang[index]}`}
                    reducer={this.props.createDiagnosisQuestion}
                  />
                  <Clear onClick={() => removeAnswer(type, index)}/>
                </div>

                <Tabs
                  value={this.state.answerLang[index] || 'en'}
                  onChange={(event, value) => this.handleAnswerLangChange(value, index)}
                  indicatorColor="primary"
                  className="tab-lang answer"
                  textColor="primary"
                  centered
                >
                  <Tab label="English" value="en"/>
                  <Tab label="Sweden"  value="swe" />
                </Tabs>
              </li>))}
          </ol>
          <div className="add-answer"
               onClick={() => this.addNewAnswer('multiple')}>
            <AddIcon /> ADD ANSWER
          </div>
        </div>;
    }
  };

  changeAnswerType = (event) => {
    const value = event.target.value;
    updateCrateQuestionFields(value, 'answerType');
  };

  render() {

    const {
      sequenceList,
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle, area, question, questionKey, sequence, sequenceType, answerType, content_type
      }
    } = this.props;

    const { content_type_list, keyIsUniqueError } = this.state;


    return <Grid container className="margin-remove">

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
            <Grid item sm={6} style={{display: 'flex', flexDirection: 'column'}}>
              <Typography
                type="caption"
                gutterBottom
                className="custom-select-title">
                Question type
              </Typography>

              <MUISelect
                value={content_type}
                onChange={e => updateCrateQuestionFields(e.target.value, 'content_type')}
                MenuProps={{ PaperProps: { style: { width: 400 }}}}
              >
                {content_type_list.map((item, index) => (
                  <MenuItem
                    key={ item.value }
                    value={ item.value }
                    style={{ fontWeight: this.state.answer.indexOf(item.value) !== -1 ? '500' : '400' }}>
                    {item.label}
                  </MenuItem>
                ))}
              </MUISelect>
            </Grid>
          </Grid>

          {/*Title and Body Area*/}
          <Grid container className="row-item">
            <Grid item md={6} sm={12}>
              <Input
                id='questionTitle'
                value={questionTitle}
                reducer={ createDiagnosisQuestion }
                label={ 'Title' }
              />
            </Grid>
            <Grid item md={6} sm={12} >

              <AsyncAreaSelect
                domain="diagnostics"
                path="findArea"
                valuePath="area"
                idKey="create_diagnostic_question"
              />

            </Grid>
          </Grid>

          {/* Question !!! */}
          <DiagnosticQuestion
            id="question"
            question={question}
          />

          {/* Question Key */}
          <Grid container className="row-item">
            <Grid item xs={12}>
              <Input
                id='questionKey'
                value={questionKey}
                reducer={createDiagnosisQuestion}
                label={ 'kl' }
                placeholder={ 'kkkk' }
                error={!!keyIsUniqueError}
                onCustomChange={this.checkIfQuestionKeyValid}
              />
            </Grid>
          </Grid>


          {/* Sequence */}
          <SequenceBlock
            domain="diagnostics"
            path="sequenceList"
            value={sequence}
            valuePath="sequence"
            typePath="sequenceType"
            type={sequenceType}
            list={sequenceList}
          />

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
                      onChange={this.changeAnswerType}
                      value={item.value}
                      aria-label={item.value}
                    />}
                    label={item.label} />
                </Grid>)
              )}
            </Grid>
          </FormGroup>

          <Grid container className="row-item">
            {this.answers(answerType)}
          </Grid>



        </div>
      </Grid>

      <Grid item
            md={6}
            sm={12}
            className="rules">

        {content_type === "functionalTest" && <DiagnosisAssets/>}

        <DiagnosisRulesComponent
          type="diagnostic"
          page="diagnostic"
          area={area}
          step={sequence}
        />


      </Grid>

    </Grid>
  }
}


const mapStateToProps = state =>
  ({createDiagnosisQuestion: state.createDiagnosisQuestion});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

DiagnosisTypeQuestion.defaultProps = {
  sequenceList       : []
};

DiagnosisTypeQuestion.propTypes = {
  sequenceList       : PropTypes.array
};


export default  connect(mapStateToProps, mapDispatchToProps)(DiagnosisTypeQuestion);
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
  findUniqueKey,
  findArea }                        from '../../../../actions';

import { onChange }                   from '../../../../actions/common';
import { AsyncCreatable }           from 'react-select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Tabs, { Tab }                from 'material-ui/Tabs';
import debounce                     from 'lodash/debounce';
// UI
import Grid                     from 'material-ui/Grid';
import Button                   from 'material-ui/Button';
import Typography               from 'material-ui/Typography';
import TextField                from 'material-ui/TextField';
import Radio                    from 'material-ui/Radio';
import Input                    from '../../../common/Input/Input';
import { FormControlLabel,
         FormGroup }            from 'material-ui/Form';
import _select                  from 'material-ui/Select';
import ChooseSequence           from './chooseSequence';

class CreateQuestionComponent extends Component {
  state = {
    questionType: 'Diagnosis',
    backPath: '',
    answer: [1,2,3],
    sequenceTypeList: [
      {label: 'Normal', value: 'normal'},
      {label: 'After',  value: 'after'},
      {label: 'Before', value: 'before'},

    ],
    sequenceType: 'normal',
    selectedValue: 'single',
    answerType: [
      {label: 'Single',   value: 'single'},
      {label: 'Range',    value: 'range'},
      {label: 'Multiple', value: 'multiple'},
    ],
    questionLang: 'en',
    keyIsUniqueError: '',
    chooseSequence: true
  };

  constructor(props) {
    super(props);
  }

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

  onAreasChange = (value) => updateCrateQuestionFields(value, 'bodyAreas');

  handleQuestionLangChange = (event, value) => this.setState({ questionLang: value });

  openChooseSequence = (chooseSequence) => this.setState({ chooseSequence });

  handleSequenceTypeChange = (event) => {
    const sequenceType = event.target.value;
    this.setState({ sequenceType });
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



  addAnswer = () => {
    const answer = this.state.answer.concat(1);
    this.setState({answer})
  };

  changeAnswerType = (event) => {
    const value = event.target.value;
    updateCrateQuestionFields(value, 'answerType');
  };

  answers = (type) => {
    switch (type) {
      case 'multiple':
        return <ol type="A" style={{width: '100%'}}>
          {this.state.answer.map((answer, index) => (
            <li  key={index} className="row-item">
              <Grid item xs={12}>
                <Input
                  id={`single[${index}]`}
                  reducer={this.props.createDiagnosisQuestion}
                />
              </Grid>
            </li>))}
        </ol>;

      case 'range':
          return;
      default:
        return <ol type="A" style={{width: '100%'}}>
          {this.state.answer.map((answer, index) => (
            <li  key={index} className="row-item">
              <Grid item xs={12}>
                <Input
                  id={`single[${index}]`}
                  reducer={this.props.createDiagnosisQuestion}
                />
              </Grid>
            </li>))}
        </ol>;
    }
  };

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle, bodyAreas,
        question,
        questionKey,
        sequence,

        sequenceProp,
        answerType,
        single,
        multiple,
        range,
        answer,
        enterAnswer,
        rules,
      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
    } = this.props;

    return (
      <div id="create-question">
        <div className="page-sub-header">
          <span>Create Diagnosis Question</span>
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


              {/*Title and Body Area*/}
              <Grid container className="row-item">
                <Grid item md={6} sm={12}>
                  <Input
                    id='questionTitle'
                    value={questionTitle}
                    reducer={ createDiagnosisQuestion }
                    label={ L_CREATE_QUESTION.questionTitle }
                    placeholder={ L_CREATE_QUESTION.enterTitle }
                  />
                </Grid>
                <Grid item md={6} sm={12} >
                  <Typography
                    type="caption"
                    gutterBottom
                    className="custom-select-title">
                    Body Areas
                  </Typography>
                  <AsyncCreatable
                      name='body-areas'
                      id='body-areas'
                      loadOptions={this.getOptions}
                      onChange={this.onAreasChange}
                      placeholder={'Select body area'}
                      value={bodyAreas}/>
                </Grid>
              </Grid>


              {/* Question !!! */}
              <Grid container className="row-item">
                <Grid item xs={12}>
                  {this.state.questionLang === 'en' ?
                    <Input
                      id='question.en'
                      value={question.en}
                      reducer={createDiagnosisQuestion}
                      label={ L_CREATE_QUESTION.question }
                      placeholder={ L_CREATE_QUESTION.enterQuestion }
                      multiline={true}
                      rows="5"
                      cols="60"
                    /> :
                    <Input
                      id='question.sw'
                      value={question.sw}
                      reducer={createDiagnosisQuestion}
                      label={ L_CREATE_QUESTION.question }
                      placeholder={ L_CREATE_QUESTION.enterQuestion }
                      multiline={true}
                      rows="5"
                      cols="60"
                    />
                  }
                </Grid>
                <Tabs
                  value={this.state.questionLang}
                  onChange={this.handleQuestionLangChange}
                  indicatorColor="primary"
                  className="tab-lang"
                  textColor="primary"
                  centered
                >
                  <Tab label="English" value="en" />
                  <Tab label="Sweden"  value="sw" />
                </Tabs>
              </Grid>


              {/* Question Key */}
              <Grid container className="row-item">
                <Grid item xs={12}>
                  <Input
                    id='questionKey'
                    value={questionKey}
                    reducer={createDiagnosisQuestion}
                    label={ L_CREATE_QUESTION.questionKey }
                    placeholder={ L_CREATE_QUESTION.enterQuestionKey }
                    error={!!this.state.keyIsUniqueError}
                    onCustomChange={this.checkIfQuestionKeyValid}
                  />
                </Grid>
              </Grid>


              {/* Sequence */}
              <Grid container  className="row-item">
                <Grid item lg={3} className="sequence-type">
                  <_select
                    value={this.state.sequenceType}
                    onChange={this.handleSequenceTypeChange}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          width: 400,
                        },
                      },
                    }}
                  >
                    {this.state.sequenceTypeList.map((item, index) => (
                      <MenuItem
                        key={item.value}
                        value={item.value}
                        style={{
                          fontWeight: this.state.answer.indexOf(item.value) !== -1 ? '500' : '400',
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </_select>
                </Grid>

                <Grid item xs={2}
                      className="sequence-wrap">
                  <Typography
                    type="caption"
                    gutterBottom>
                    Sequence
                  </Typography>
                  <div className="sequence">
                    { sequence }
                  </div>
                </Grid>
              </Grid>

              <ChooseSequence
                  open={this.state.chooseSequence}
                  handleRequestClose={this.openChooseSequence}/>


              {/*<Grid className="title answer">*/}
                {/*<Typography type="title"*/}
                            {/*gutterBottom>*/}
                  {/*Answers*/}
                {/*</Typography>*/}
              {/*</Grid>*/}

              {/*<FormGroup>*/}
                {/*<Grid container className="row-item">*/}
                  {/*{this.state.answerType.map((item, index) =>*/}
                    {/*(<Grid item xs={4} key={index}>*/}
                      {/*<FormControlLabel*/}
                        {/*control={<Radio*/}
                          {/*checked={answerType === item.value}*/}
                          {/*onChange={this.changeAnswerType}*/}
                          {/*value={item.value}*/}
                          {/*aria-label={item.value}*/}
                        {/*/>}*/}
                        {/*label={item.label} />*/}
                      {/*</Grid>)*/}
                  {/*)}*/}
                {/*</Grid>*/}
              {/*</FormGroup>*/}

              {/*<Grid container className="row-item">*/}
                {/*{this.answers(answerType)}*/}
              {/*</Grid>*/}

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
  onChange,
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateQuestionComponent);
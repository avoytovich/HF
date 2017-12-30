import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import { browserHistory }           from 'react-router'


// Components
import {
  ChooseSequence,
  DiagnosisAssets,
  DiagnosisRulesComponent
}                                   from '../../../../common';
import DiagnosisTypeQuestion        from './diagnosisTypeQuestion';


import { genCharArray }             from '../../../../../utils';
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  findUniqueKey,
  addNewAnswer,
  getSequenceList,
  updateQuestionCreate,
  removeAnswer,
  getQuestionById,
  findArea }                        from '../../../../../actions';
import { onChange }                 from '../../../../../actions/common';
//import { Async }                    from 'react-select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Tabs, { Tab }                from 'material-ui/Tabs';
import AddIcon                      from 'material-ui-icons/Add';
import Clear                        from 'material-ui-icons/Clear';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Radio                        from 'material-ui/Radio';
import Input                        from '../../../../common/Input/Input';
import { FormControlLabel,
         FormGroup }                from 'material-ui/Form';
import MUISelect                    from 'material-ui/Select';
import MUIInput, { InputLabel }     from 'material-ui/Input';
import { get }                      from 'lodash'
import DiagnosisTypeVAS              from './diagnosisTypeVAS';


class CreateQuestionComponent extends Component {
  state = {
    questionType    : 'diagnosis',
    answer          : [1,2,3],
    sequenceTypeList: [
      {label: 'Normal', value: 'normal'},
      {label: 'After',  value: 'after'},
      {label: 'Before', value: 'before'},

    ],
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
    questionLang    : 'en',
    answerLang      : ['en', 'en'],
    keyIsUniqueError: '',
    chooseSequence  : false,
    sequenceList    : []
  };

  constructor(props) {
    super(props);
    clearCreateQuestion();

    updateCrateQuestionFields(this.state.questionType, 'page');
    this.getSequenceQuestionList();
  }

  componentWillMount() {
    if (this.props.routeParams.id) {
      getQuestionById('diagnostics', 'createQuestion', this.props.routeParams.id).then(({answer}) => {
        if (answer.values) {
          const keys = Object.keys(answer.values);
          const answerLang = keys.map(() => 'en');
          this.setState({answerLang})
        }
      });
    }
  }

  getOptions = (input) => {
    return findArea('diagnostics', 'findArea').then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.title, value: item.id }));
      return {
        options: [{ label: 'All', value: null, id: 0 }].concat(_data),
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      }
    });
  };

  onAreasChange = (value) => {
    updateCrateQuestionFields(value, 'area');
  };

  handleQuestionLangChange = (event, value) => this.setState({ questionLang: value });

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

  openChooseSequence = (chooseSequence) => this.setState({ chooseSequence });

  handleSequenceTypeChange = (event) => {
    const sequenceType = event.target.value;
    updateCrateQuestionFields(sequenceType, 'sequenceType');
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

  getAnswer = (type, obj) => {
    if (type === 'range') {
      const correctValue = obj[type];
      return {
        min: correctValue.from,
        max: correctValue.to
      };
    }
    else {
      //const letters = genCharArray();
      const correctValue = obj[type];
      return Object.keys(correctValue).reduce((result, item, index) => {
        if (item) {
          const key = index + 1; //letters[index];
          const value = correctValue[item];
          return Object.assign({}, result, {[key]:value})
        }
        return result
      }, {});
    }
  };

  getAnswerType = (type) => {
    switch(type) {
      case 'single':
        return {type: 'single', subtype: 'list'};
      case 'range':
        return {type: 'single', subtype: 'range'};
      case 'multiple':
        return {type: 'multiple', subtype: 'list'};
      default:
        console.log('Wrong type');
        return {type: 'single', subtype: 'list'};
    }
  };

  changeAnswerType = (event) => {
    const value = event.target.value;
    updateCrateQuestionFields(value, 'answerType');
  };

  submit = (value) => {
    const {
      sequenceType, questionKey, sequence, area, question, answerType,
      questionTitle, rules, content_type, diagnostic_assets
    } = value;
    const {type, subtype} = this.getAnswerType(answerType);
    const result = {
      type : 'diagnostic',
      key  : questionKey,
      step : this.getSequenceTypeResult(sequenceType, sequence),
      area_id : area.value || 0,
      title: questionTitle,
      question: { ...question },
      answer: {
        type, subtype,
        values: this.getAnswer(answerType, value)
      },
      rule: rules[0],
      content_type,
      test_file_id: get(diagnostic_assets, '0.id') || null
    };

    !this.props.routeParams.id ?
      diagnosisQuestionCreate('diagnostics', 'createQuestion', result)
      .then(() => browserHistory.push(`/matrix-setup/diagnosis`)) :

      updateQuestionCreate('diagnostics', 'createQuestion', result, this.props.routeParams.id)
      .then(() => browserHistory.push(`/matrix-setup/diagnosis`))

  };

  getSequenceTypeResult = (sequenceType, sequence) => {
    return sequenceType === 'after' ?
      sequence + 0.5 : sequenceType === 'before' ?
        sequence - 0.5 : sequence;
  };

  cancel = () => browserHistory.push(`/matrix-setup/diagnosis`);

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

  getSequenceQuestionList = () =>
    getSequenceList('diagnostics', 'sequenceList')
    .then(({data}) => this.setState({sequenceList: data.data}));

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        area,
        question,
        questionKey,
        sequence,
        sequenceType,
        answerType,
        content_type,
      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
    } = this.props;

    return (
      <div id="create-question">

        <div className="page-sub-header">
          <span>
            Create Diagnosis Question
          </span>

          <div className="nav-buttons">

            <Button onClick={this.cancel}>
              Cancel
            </Button>

            <Button raised
                    dense
                    onClick={() => this.submit(createDiagnosisQuestion)}
                    color="primary">
              Save
            </Button>

          </div>
        </div>

        {
          content_type === 'vas' ?
            <DiagnosisTypeVAS/> :
            <DiagnosisTypeQuestion sequenceList={this.state.sequenceList}/>
        }

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
import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import { browserHistory }           from 'react-router'

// Components
import DiagnosisTypeQuestion        from './diagnosisTypeQuestion';
import DiagnosisTypeVAS              from './diagnosisTypeVAS';

import {
  diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  getSequenceList,
  updateQuestionCreate,
  getQuestionById
}                                   from '../../../../../actions';
import Button                       from 'material-ui/Button';
import { get }                      from 'lodash'


class CreateQuestionComponent extends Component {
  state = {
    questionType    : 'diagnosis',
    sequenceTypeList: [
      {label: 'Normal', value: 'normal'},
      {label: 'After',  value: 'after' },
      {label: 'Before', value: 'before'},

    ],
    answerType      : [
      {label: 'Single',   value: 'single'},
      {label: 'Range',    value: 'range'},
      {label: 'Multiple', value: 'multiple'},
    ],
    answerLang      : ['en', 'en'],
    sequenceList    : []
  };

  constructor(props) {
    super(props);
    clearCreateQuestion();

    updateCrateQuestionFields(this.state.questionType, 'page');
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

  getAnswer = (type, obj) => {
    if (type === 'range') {
      const correctValue = obj[type];
      return {
        min: correctValue.from,
        max: correctValue.to
      };
    }
    else {
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

  getSequenceTypeResult = (sequenceType, sequence) =>
    sequenceType === 'after' ?
      sequence + 0.5 : sequenceType === 'before' ?
        sequence - 0.5 : sequence;

  cancel = () => browserHistory.push(`/matrix-setup/diagnosis`);

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: { content_type, questionKey },
      routeParams: { id }
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
        { id && !questionKey ?
          'Loading.....' :
          content_type === 'vas' ?
            <DiagnosisTypeVAS/> :
            <DiagnosisTypeQuestion sequenceList={this.state.sequenceList}/>

        }
      </div>
    )
  }
}

const mapStateToProps    = state => ({createDiagnosisQuestion: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateQuestionComponent);
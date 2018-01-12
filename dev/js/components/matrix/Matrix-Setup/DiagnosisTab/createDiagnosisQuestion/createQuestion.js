import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import { browserHistory }           from 'react-router'

// Components
import DiagnosisTypeQuestion        from './diagnosisTypeQuestion';
import DiagnosisTypeVAS             from './diagnosisTypeVAS';
import MatrixPreLoader              from '../../matrixPreloader';
import {
  updateCrateQuestionFields,
  getQuestionById,
  clearCreateQuestion
}                                   from '../../../../../actions';
import Button                       from 'material-ui/Button';
import { get }                      from 'lodash'
import { submitTabs }               from '../../../../../utils/matrix';


class CreateQuestionComponent extends Component {
  state = {
    questionType    : 'diagnosis',
    sequenceTypeList: [
      {label: 'Normal', value: 'normal'},
      {label: 'After',  value: 'after' },
      {label: 'Before', value: 'before'},

    ],
//    answerType      : [
//      {label: 'Single',   value: 'single'},
//      {label: 'Range',    value: 'range'},
//      {label: 'Multiple', value: 'multiple'},
//    ],
//    answerLang      : ['en', 'en'],
    sequenceList    : [],
    loading: false
  };

//  constructor(props) {
//    super(props);
//  }

  componentWillMount() {
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, 'page');

    if (this.props.routeParams.id) {
      this.setState({loading: true});
      getQuestionById('diagnostics', 'createQuestion', this.props.routeParams.id).then(({answer}) => {
        if (answer.values) {
//          const keys = Object.keys(answer.values);
//          const answerLang = keys.map(() => 'en');
//          this.setState({answerLang})
          this.setState({loading: false});
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

  getSequenceTypeResult = (sequenceType, sequence) =>
    sequenceType === 'after' ?
      sequence + 0.5 : sequenceType === 'before' ?
        sequence - 0.5 : sequence;

  submit = (value) => {
    const {
      sequenceType, questionKey, sequence, question, questionTitle, content_type, errors
    } = value;

    const optional = content_type !== 'vas' ?
        this.configureQuestionResult(value, content_type === 'functionalTest') : {};
    const validValue = { questionKey, questionTitle };
    const result = {
      type : 'diagnostic',
      key  : questionKey,
      step : this.getSequenceTypeResult(sequenceType, sequence),
      title: questionTitle,
      question: { ...question },
      content_type,
      ...optional,
    };

    submitTabs(
      validValue,
      errors,
      'diagnostics',
      'createQuestion',
      result,
      '/matrix-setup/diagnosis',
      this.props.routeParams.id
    );
  };


  configureQuestionResult = (value, optional) => {
    const { areaIds, answerType, rules, diagnostic_assets } = value,
          { type, subtype } = this.getAnswerType(answerType),
          moreProps = optional ? { test_file_id: get(diagnostic_assets, 'id') || null } : {};
    return {
      areaIds : areaIds,
      answer: {
        type, subtype,
        values: this.getAnswer(answerType, value)
      },
      rule: {and: rules},
      ...moreProps
    };
  };

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


        { id && this.state.loading ?
          <MatrixPreLoader
            left="1"
            right="2"
          />
          : content_type === 'vas' ?
              <DiagnosisTypeVAS      sequenceList={this.state.sequenceList}/> :
              <DiagnosisTypeQuestion sequenceList={this.state.sequenceList}
                                     currentId={id}/>

        }
      </div>
    )
  }
}

const mapStateToProps    = state => ({createDiagnosisQuestion: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateQuestionComponent);
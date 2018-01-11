//CreateEvaluationComponent
import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import { browserHistory }           from 'react-router'

// Components
import DiagnosisTypeQuestion        from '../../DiagnosisTab/createDiagnosisQuestion/diagnosisTypeQuestion';
import DiagnosisTypeVAS             from '../../DiagnosisTab/createDiagnosisQuestion/diagnosisTypeVAS';
import MatrixPreLoader              from '../../matrixPreloader';
import {
  updateCrateQuestionFields,
  getQuestionById,
  clearCreateQuestion
}                                   from '../../../../../actions';
import Button                       from 'material-ui/Button';
import { get }                      from 'lodash'
import { submitTabs }               from '../../../../../utils/matrix';


class CreateEvaluationComponent extends Component {
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

  getSequenceTypeResult = (sequenceType, sequence) =>
    sequenceType === 'after' ?
      sequence + 0.5 : sequenceType === 'before' ?
        sequence - 0.5 : sequence;

  submit = (value) => {
    const {
      sequenceType, questionKey, sequence, question, questionTitle, content_type
    } = value;

    const optional = content_type !== 'vas' ?
      this.configureQuestionResult(value, content_type === 'functionalTest') : {};

    const result = {
      type : 'levelUp',
      key  : questionKey,
      step : this.getSequenceTypeResult(sequenceType, sequence),
      title: questionTitle,
      question: { ...question },
      content_type,
      ...optional,
    };
    submitTabs(
      'diagnostics',
      'createQuestion',
      result,
      '/matrix-setup/levelUps',
      this.props.routeParams.id
    );
  };


  configureQuestionResult = (value, optional) => {
    const { areaIds, answerType, rules, diagnostic_assets, packageLevelsList } = value,
      { type, subtype } = this.getAnswerType(answerType),
      moreProps = optional ? { test_file_id: get(diagnostic_assets, 'id') || null } : {};
    return {
      areaIds : areaIds,
      answer: {
        type, subtype,
        values: this.getAnswer(answerType, value)
      },
      rule: {and: rules},
      packageLevelIds: !packageLevelsList.length ? [] : packageLevelsList.map(el => el.levelId),
      ...moreProps
    };
  };

  cancel = () => browserHistory.push(`/matrix-setup/levelUps`);

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: { content_type, questionKey, packageLevelsList },
      routeParams: { id }
    } = this.props;
    return (
      <div id="create-question">
        <div className="page-sub-header">

          <span>
           Create Level up Question
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
          <MatrixPreLoader
            left="1"
            right="2"
          />
          : content_type === 'vas' ?
            <DiagnosisTypeVAS
              sequenceList={this.state.sequenceList}/> :
            <DiagnosisTypeQuestion
              page='evaluations'
              packages={true}
              packageLevelsList={packageLevelsList}
              sequenceList={this.state.sequenceList}/>
        }
      </div>
    )
  }
}

const mapStateToProps    = state => ({createDiagnosisQuestion: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateEvaluationComponent);
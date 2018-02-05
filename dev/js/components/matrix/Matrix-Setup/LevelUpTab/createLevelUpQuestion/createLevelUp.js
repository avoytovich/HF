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
import { notifier } from "../../../../../actions/common/notifier";
import { CreateItemNavButtons }     from '../../../../common';


class CreateLevelUpComponent extends Component {
  state = {
    questionType    : 'levelUp',
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
    sequenceList    : [],
    loading: false
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, 'page');
    if (this.props.routeParams.id) {
      this.setState({loading: true});
      getQuestionById('diagnostics', 'createQuestion', this.props.routeParams.id).then(({answer}) => {
        if (answer.values) {
          const keys = Object.keys(answer.values);
          const answerLang = keys.map(() => 'en');
          this.setState({answerLang});
          this.setState({loading: false});
        }
      });
    }
  }

  getAnswer = (type, obj) => {
    if (type === 'range') {
      const correctValue = obj[type];
      return {
        min: correctValue.from || 0,
        max: correctValue.to || 100
      };
    }
    else {
      const correctValue = obj['single'];
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
      sequenceType, questionKey, sequence, question, questionTitle, content_type, errors, diagnostic_assets, testing,
      level_up
    } = value;
    const validValue = { questionKey, questionTitle };
    const isContentType = content_type === 'functionalTest';
    const optional = content_type !== 'vas' ?
      this.configureQuestionResult(value, isContentType) : {};

    const validateAssets = isContentType && !this.validateDiagnosticAssets(diagnostic_assets);

    if (validateAssets){
      return notifier({
        title: 'Assets is empty',
        message: 'Please, select assets!',
        status: 'error',
      })
    }

    const savedErrors = {questionKey: errors.questionKey};

    const result = {
      type : 'levelUp',
      key  : questionKey,
      step : this.getSequenceTypeResult(sequenceType, sequence),
      title: questionTitle,
      question: { ...question },
      content_type,
      testing,
      level_up,
      ...optional,
    };

    submitTabs(
      validValue,
      savedErrors,
      'diagnostics',
      'createQuestion',
      result,
      '/matrix-setup/levelUps',
      this.props.routeParams.id
    );
  };

  validateDiagnosticAssets = (assets) =>
      assets.hasOwnProperty('id') && !!assets.id;

  configureQuestionResult = (value, optional) => {
    const { areaIds, answerType, rules, diagnostic_assets, packageLevelsList } = value,
      { type, subtype } = this.getAnswerType(answerType),
      moreProps = optional ? { test_file_id: get(diagnostic_assets, 'id') || null } : {};
    return {
//      areaIds : areaIds,
      answer: {
        type, subtype,
        values: this.getAnswer(answerType, value)
      },
      rule: rules && rules.length ? {and: rules} : [],
      packageLevelIds: !packageLevelsList.length ? [] : packageLevelsList.map(el => el.levelId),
      ...moreProps
    };
  };

  cancel = () => browserHistory.push(`/matrix-setup/levelUps`);

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: { content_type, questionKey, packageLevelsList, testing },
      routeParams: { id }
    } = this.props;
    return (
      <div id="create-question">

        <CreateItemNavButtons
          title={'Create Level up Question'}
          showSwitch={true}
          switchChecked={testing}
          switchLabel={'Live'}
          onSwitchChange={(e, value) => updateCrateQuestionFields(!value , 'testing')}
          onCancelClick={this.cancel}
          cancelLabel={'Cancel'}
          onSaveClick={() => this.submit(createDiagnosisQuestion)}
          saveLabel={'Save'}
        />


        { id && this.state.loading ?
          <MatrixPreLoader
            left="1"
            right="2"
          />
          : content_type === 'vas' ?
            <DiagnosisTypeVAS
              sequenceList={this.state.sequenceList}/> :
            <DiagnosisTypeQuestion
              page='evaluations'
              SequenceBlockReqType="evaluation"
              packages={true}
              showLevelUp={true}
              hideArea={true}
              currentId={id}
              packageLevelsList={packageLevelsList}
              sequenceList={this.state.sequenceList}/>
        }
      </div>
    )
  }
}

const mapStateToProps    = state => ({createDiagnosisQuestion: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateLevelUpComponent);
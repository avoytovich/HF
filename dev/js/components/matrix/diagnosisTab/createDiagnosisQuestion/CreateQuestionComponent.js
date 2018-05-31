import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import { browserHistory }           from 'react-router'

// Components
import DiagnosisTypeQuestion        from './DiagnosisTypeQuestion';
import DiagnosisTypeVAS             from './DiagnosisVASQuestion';
import MatrixPreLoader              from '../../matrixPreloader';
import {
  updateCrateQuestionFields,
  getQuestionById,
  clearCreateQuestion,
  notifier
}                                   from '../../../../actions';
import Button                       from 'material-ui/Button';
import { get }                      from 'lodash'
import { submitTabs }               from '../../../../utils';
import { CreateItemNavButtons }     from '../../../common';



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
        }
        this.setState({loading: false});
      });
    }
  }

  getAnswer = (type, obj) => {
    if (type === 'range') {
      const correctValue = obj[type];
      return {
        min: +correctValue.from,
        max: +correctValue.to
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

  submitQuestion = (value) => {
    const {
      testing,
      sequenceType,
      questionKey,
      sequence,
      question,
      questionTitle,
      content_type,
      diagnostic_assets,
      files,
      errors,
    } = value;

    const isContentType = content_type === 'functionalTest';
    const validValue    = this.createValidateObj({ questionKey, questionTitle, question }, value);
    const optional      = content_type !== 'vas' ?
      this.configureQuestionResult(value, isContentType) :
      {};

    const result = {
      type : 'diagnostic',
      key  : questionKey,
      step : this.getSequenceTypeResult(sequenceType, sequence),
      title: questionTitle,
      question: { ...question },
      content_type,
      testing,
      ...optional,
    };

    const validateAssets = isContentType && !this.validateDiagnosticAssets(files);

    if (validateAssets){
      return notifier({
        title: 'Assets is empty',
        message: 'Please, select assets!',
        status: 'error',
      })
    }
    const savedErrors = {questionKey: errors.questionKey};

    submitTabs(
      validValue,
      savedErrors,
      'diagnostics',
      'createQuestion',
      result,
      '/matrix-setup/diagnosis',
      this.props.routeParams.id
    );
  };

  createValidateObj = (temp, value) => {
    const { answerType } = value;
    return {
      ...temp,
      [answerType]: value[answerType]
    };
  };

  validateDiagnosticAssets = (assets) => (
    (assets && assets['en'] && assets['en'].video) ||
      (assets && assets['swe'] && assets['swe'].video) &&
      true || false
  );

  configureQuestionResult = (value, optional) => {
    const {
        areaIds,
        answerType,
        rules,
        diagnostic_assets,
        files,
    } = value;
    const filesFinal = {
      en: {
        video_id: null,
        //image_id: null
      },
      swe: {
        video_id: null,
        //image_id: null
      }
    };
    const videoEn   = get(files, '[en].video', { id : null });
    const videoSwe   = get(files, '[swe].video', { id : null });
    //const imageEn   = get(files, '[en].preview', { id: null });
    //const imageSwe   = get(files, '[swe].preview', { id: null });
    if (files && files.en && files.en.video /*&& files.en.preview*/) {
      filesFinal.en.video_id = files.en.video.id;
      //filesFinal.en.image_id = files.en.preview.id;
    } else {
      filesFinal.en.video_id = get(videoEn, 'id');
      //filesFinal.en.image_id = get(imageEn, 'id');
    }
    if (files && files.swe && files.swe.video /*&& files.swe.preview*/) {
      filesFinal.swe.video_id = files.swe.video.id;
      //filesFinal.swe.image_id = files.swe.preview.id;
    } else {
      filesFinal.swe.video_id = get(videoSwe, 'id');
      //filesFinal.swe.image_id = get(imageSwe, 'id');
    }
    const {
      type,
      subtype
    } = this.getAnswerType(answerType);
    const moreProps = optional ?
      {
        files: filesFinal || null,
        test_poster_id: get(diagnostic_assets, 'id') || null
      }
      :
      {};
    let answerValues = subtype === 'range' ?
      this.getAnswer(answerType, value)
      :
      { values: this.getAnswer(answerType, value) };

    return {
      areaIds : areaIds,
      answer: {
        type,
        subtype,
        ...answerValues,
      },
      rule: rules && rules.length ? {and: rules} : [],
      ...moreProps
    };
  };

  cancel = () => browserHistory.push(`/matrix-setup/diagnosis`);

  render() {
    console.log('Props', this.props);
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        content_type,
        questionKey,
        testing,
        service,
      },
      routeParams: {
        id
      }
    } = this.props;
    //console.log(service, content_type);
    return (
      <div id="create-question">

        <CreateItemNavButtons
          title='Create Diagnosis Question'
          showSwitch={true}
          switchChecked={testing}
          switchLabel={'Live'}
          onSwitchChange={(e, value) => updateCrateQuestionFields(!value , 'testing')}
          onCancelClick={this.cancel}
          cancelLabel={'Cancel'}
          onSaveClick={() => this.submitQuestion(createDiagnosisQuestion)}
          saveLabel={'Save'}
        />

        <div className="create-question-sub-container">
          {
            id && this.state.loading ?
              <MatrixPreLoader
                left="1"
                right="2"
              />
              : content_type === 'vas' || service ?
              <DiagnosisTypeVAS
                service={service}
                sequenceList={this.state.sequenceList}
              />
              :
              <DiagnosisTypeQuestion
                sequenceList={this.state.sequenceList}
                currentId={id}
              />
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps    = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateQuestionComponent);
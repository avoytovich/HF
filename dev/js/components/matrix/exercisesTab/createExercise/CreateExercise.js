import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import {
  diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  updateQuestionCreate,
  getExerciseById,
  dispatchMatrixPayloadWired,
} from '../../../../actions';
import { onChange } from '../../../../actions/common';
import { AsyncCreatable } from 'react-select';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input from '../../../common/Input/Input';
import Tabs, { Tab } from 'material-ui/Tabs';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import {
  BlockDivider,
  AssetsList
} from '../../../common';
import MatrixPreLoader from '../../matrixPreloader';
import {
  submitTabs,
  validateExercises,
} from '../../../../utils';
import { CreateItemNavButtons } from '../../../common';

class CreateExercise extends Component {
  state = {
    questionType: 'exercise',
    titleLang: 'en',
    informationLang: 'en',
    instructionLang: 'en',
    chooseFiles: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillMount() {
    if (this.props.params.id) {
      this.setState({ loading: true });
      getExerciseById('exercises', 'exercises', this.props.params.id)
        .then(() => this.setState({ loading: false }));
    } else {
      //      const newOne = Object.assign({}, DEFAULT_LEVEL);
      //      updateCrateQuestionFields([newOne], 'packageLevels');
    }
  }

  componentWillUnmount() {
    clearCreateQuestion();
  }

  done = (value) => {
    const {
      id,
      title,
      comments,
      text,
      instruction,
      information,
      name,
      files,
      errors,
      testing_mode,
      ordinal,
    } = value;

    let {
      isValid,
      errors: ordinalError,
    } = validateExercises({ exercise: { ordinal } });
    dispatchMatrixPayloadWired({ errors: ordinalError });

    if (!isValid) {
      return
    }

    const validValue = { title, comments, instruction, information, name };
    const videoEn   = get(files, '[en].video', { id : null });
    const videoSwe   = get(files, '[swe].video', { id : null });
    //const imageEn   = get(files, '[en].preview', { id: null });
    //const imageSwe   = get(files, '[swe].preview', { id: null });
    let filesObjEn = {
      en: {
        video_id: null,
        //image_id: null
      }
    };
    let filesObjSwe = {
      swe: {
        video_id: null,
        //image_id: null
      }
    };
    if (videoEn[0]) {
      filesObjEn.en.video_id = videoEn[0].id;
    } else if (get(videoEn, 'id')) {
      filesObjEn.en.video_id = get(videoEn, 'id');
    }
    /*if (imageEn[0]) {
      filesObjEn.en.image_id = imageEn[0].id;
    } else if (get(imageEn, 'id')) {
      filesObjEn.en.image_id = get(imageEn, 'id');
    }*/
    if (videoSwe[0]) {
      filesObjSwe.swe.video_id = videoSwe[0].id;
    } else if (get(videoSwe, 'id')) {
      filesObjSwe.swe.video_id = get(videoSwe, 'id');
    }
    /*if (imageSwe[0]) {
      filesObjSwe.swe.image_id = imageSwe[0].id;
    } else if (get(imageSwe, 'id')) {
      filesObjSwe.swe.image_id = get(imageSwe, 'id');
    }*/
    let filesFinal = Object.assign({}, filesObjEn, filesObjSwe);

    const result = {
      title,
      ordinal,
      comments,
      text: 'error',
      information,
      instruction,
      name,
      testing_mode,
      files: filesFinal,
      image_id: this.props.createDiagnosisQuestion.diagnostic_assets[0].id
    };

    submitTabs(
      { exercise: validValue },
      errors,
      'exercises',
      'exercises',
      result,
      '/matrix-setup/exercises',
      this.props.routeParams.id
    );

    //    !this.props.routeParams.id ?
    //      diagnosisQuestionCreate('exercises', 'exercises', result)
    //      .then(() => browserHistory.push(`/matrix-setup/exercises`)) :
    //
    //      updateQuestionCreate('exercises', 'exercises', {...result, id: id}, id)
    //      .then(() => browserHistory.push(`/matrix-setup/exercises`))

  };

  cancel = () => browserHistory.push(`/matrix-setup/exercises`);

  handleTabChange = (event, tab) => {
    this.setState({ tab });
    //    browserHistory.push(`/packages-create/${this.props.routeParams.packageId}?level=${tab}`);
  };


  handleQuestionLangChange = (event, value, type) => this.setState({ [type]: value });


  openChooseFiles = (chooseFiles) => this.setState({ chooseFiles });


  handleDelete = (ID) => {
    const filtered = get(this.props.exerciseState, `files.data`).filter(el => el && el.id != ID);
    updateCrateQuestionFields(filtered, `exercise.files.data`)
  };

  _assetsListConverter = (list, filterKey) => {
    let newList = cloneDeep(list);
    return newList.filter(assets => assets.type === filterKey);
  };


  render() {
    console.log('PROPS', this.props);
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        packageLevels,
        exerciseState,
        questionAnswerLang,
        diagnostic_assets,
      },
      routeParams: {
        id
      },
      exerciseState: {
        name,
        comments,
        title,
        information,
        instruction,
        files,
        testing_mode
      },
    } = this.props;

    const {
      loading,
      titleLang,
      informationLang,
      instructionLang,
    } = this.state;

    let labelLang = '';
    let valueVideoPath = '';
    //let valuePosterPath = '';
    switch(questionAnswerLang) {
      case 'swe':
        labelLang = 'swe';
        valueVideoPath = 'exercise.files[swe].video';
        //valuePosterPath = 'exercise.files[swe].preview';
        break;
      default:
        labelLang = 'en';
        valueVideoPath = 'exercise.files[en].video';
        //valuePosterPath = 'exercise.files[en].preview';
    }

    return (
      <div id="create-question">

        <CreateItemNavButtons
          title={'Create Exercise'}
          showSwitch={true}
          switchChecked={testing_mode}
          switchLabel={'Live'}
          onSwitchChange={(e, value) => updateCrateQuestionFields(!value, 'exercise.testing_mode')}
          onCancelClick={this.cancel}
          cancelLabel={'Cancel'}
          onSaveClick={() => this.done(this.props.exerciseState)}
          saveLabel={'Save'}
        />
        <div className="create-question-sub-container">

          {id && loading ?
            <MatrixPreLoader
              left="1"
              right="2"
            />
            :
            <BlockDivider title="Exercise">

              <div className="main-question">

                <Grid container>
                  <Grid item xs={12}>
                    <Typography type="title">
                      Exercise
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className="row-item">
                  <Grid item xs={12}>
                    <Input
                      id='exercise.ordinal'
                      reducer={createDiagnosisQuestion}
                      label={'Exercise Number*'}
                      className="MUIControl"
                      placeholder={1.1}
                    />
                  </Grid>
                </Grid>

                <Grid container className="row-item">
                  <Grid item xs={12}>
                    <Input
                      id='exercise.name'
                      value={name}
                      reducer={createDiagnosisQuestion}
                      label={'Name*'}
                      className="MUIControl"
                      placeholder={'Name'}
                    />
                  </Grid>
                </Grid>

                <Grid container className="row-item">
                  <Grid item xs={12}>
                    <Input
                      id='exercise.comments'
                      value={comments}
                      reducer={createDiagnosisQuestion}
                      label={'Comments*'}
                      placeholder={'Comments*'}
                      className="MUIControl"
                      multiline={true}
                      rows="5"
                      cols="60"
                    />
                  </Grid>
                </Grid>

                {/* Question !!! */}
                <Grid container className="row-item">
                  <Grid item xs={12}>
                    <Input
                      id={`exercise.title.${questionAnswerLang}`}
                      value={!!title && title[questionAnswerLang]}
                      reducer={createDiagnosisQuestion}
                      label={'Title*'}
                      className="MUIControl"
                      placeholder={'Title*'}
                    />
                  </Grid>
                </Grid>

                <Typography type="title" style={{ marginTop: '40px' }}>
                  Exercise Information
                </Typography>

                <Grid container className="row-item">
                  <Grid item xs={12}>
                    <Input
                      id={`exercise.information.${questionAnswerLang}`}
                      value={!!information && information[questionAnswerLang]}
                      reducer={createDiagnosisQuestion}
                      label={'Information'}
                      placeholder={'Information'}
                      multiline={true}
                      className="MUIControl"
                      rows="5"
                      cols="60"
                    />
                  </Grid>
                </Grid>

                <Typography type="title" style={{ marginTop: '40px' }}>
                  Exercise Instruction
                </Typography>

                <Grid container className="row-item">
                  <Grid item xs={12}>
                    <Input
                      id={`exercise.instruction.${questionAnswerLang}`}
                      value={!!instruction && instruction[questionAnswerLang]}
                      reducer={createDiagnosisQuestion}
                      label={'Instruction*'}
                      placeholder={'Instruction*'}
                      multiline={true}
                      className="MUIControl"
                      rows="5"
                      cols="60"
                    />
                  </Grid>
                </Grid>

              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <AssetsList
                  assetsListConverter={list => this._assetsListConverter(list, 'video')}
                  title='Video'
                  list={get(files, `[${labelLang}].video`, [])}
                  path="assets"
                  domain="exercises"
                  valuePath={valueVideoPath}
                />

                <AssetsList
                  assetsListConverter={list => this._assetsListConverter(list, 'image')}
                  title="Poster"
                  list={ diagnostic_assets }
                  path="assets"
                  domain="exercises"
                  valuePath="diagnostic_assets"
                />
              </div>


            </BlockDivider>
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  exerciseState: state.createDiagnosisQuestion.exercise,
  commonReducer: state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateExercise);
import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  updateQuestionCreate,
  getExerciseById,
  dispatchMatrixPayloadWired,
}                                   from '../../../../actions';
import { onChange }                 from '../../../../actions/common';
import { AsyncCreatable }           from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../common/Input/Input';
import Tabs, { Tab }                from 'material-ui/Tabs';
import get                          from 'lodash/get';
import cloneDeep                    from 'lodash/cloneDeep';
import {
  BlockDivider,
  AssetsList
}                                   from '../../../common';
import MatrixPreLoader              from '../../matrixPreloader';
import {
  submitTabs,
  validateExercises,
}                                   from '../../../../utils';
import { CreateItemNavButtons }     from '../../../common';

class CreateExercise extends Component {
  state = {
    questionType   : 'exercise',
    titleLang      : 'en',
    informationLang: 'en',
    instructionLang: 'en',
    chooseFiles    : false,
    loading        : false,
  };

  constructor(props) {
    super(props);
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillMount() {
    if (this.props.params.id) {
      this.setState({loading: true});
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
      files = [{ video: [], preview: [] }],
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
    const video   = get(files, '[0].video', { id : null });
    const image   = get(files, '[0].preview', { id: null });
    let filesObj = {};
    if (video.id || get(video, '[0].id')) {
      filesObj.video_id = video.id || get(video, '[0].id');
    }
    if (image.id || get(image, '[0].id')) {
      filesObj.image_id = image.id || get(image, '[0].id');
    }
    let filesFinal = Object.keys(filesObj).length ? [filesObj] : [];

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
    };

    submitTabs(
      {exercise: validValue},
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


  openChooseFiles = (chooseFiles) => this.setState({chooseFiles});


  handleDelete = (ID) =>  {
    const filtered = get(this.props.exerciseState, `files.data`).filter(el =>  el && el.id != ID);
    updateCrateQuestionFields(filtered, `exercise.files.data`)
  };

  _assetsListConverter = (list, filterKey) => {
    let newList = cloneDeep(list);
    return newList.filter(assets => assets.type === filterKey);
  };


  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        packageLevels,
        exerciseState,
        questionAnswerLang,
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

    return (
      <div id="create-question">

        <CreateItemNavButtons
          title={'Create Exercise'}
          showSwitch={true}
          switchChecked={testing_mode}
          switchLabel={'Live'}
          onSwitchChange={(e, value) => updateCrateQuestionFields(!value , 'exercise.testing_mode')}
          onCancelClick={this.cancel}
          cancelLabel={'Cancel'}
          onSaveClick={() => this.done(this.props.exerciseState)}
          saveLabel={'Save'}
        />
        <div className="create-question-sub-container">

          {  id && loading ?
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
                      label={ 'Exercise Number*' }
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
                      label={ 'Name*' }
                      className="MUIControl"
                      placeholder={ 'Name' }
                    />
                  </Grid>
                </Grid>

                <Grid container className="row-item">
                  <Grid item xs={12}>
                    <Input
                      id='exercise.comments'
                      value={comments}
                      reducer={createDiagnosisQuestion}
                      label={ 'Comments*' }
                      placeholder={ 'Comments*' }
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
                      label={ 'Title*' }
                      className="MUIControl"
                      placeholder={ 'Title*' }
                    />
                  </Grid>
                </Grid>

                <Typography type="title" style={{marginTop: '40px'}}>
                  Exercise Information
                </Typography>

                <Grid container className="row-item">
                  <Grid item xs={12}>
                    <Input
                      id={`exercise.information.${questionAnswerLang}`}
                      value={!!information && information[questionAnswerLang]}
                      reducer={createDiagnosisQuestion}
                      label={ 'Information' }
                      placeholder={ 'Information' }
                      multiline={true}
                      className="MUIControl"
                      rows="5"
                      cols="60"
                    />
                  </Grid>
                </Grid>

                <Typography type="title"  style={{marginTop: '40px'}}>
                  Exercise Instruction
                </Typography>

                <Grid container className="row-item">
                  <Grid item xs={12}>
                    <Input
                      id={`exercise.instruction.${questionAnswerLang}`}
                      value={!!instruction && instruction[questionAnswerLang]}
                      reducer={createDiagnosisQuestion}
                      label={ 'Instruction*' }
                      placeholder={ 'Instruction*' }
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
                  list={get(files, '[0].video', [])}
                  path="assets"
                  domain="exercises"
                  valuePath="exercise.files[0].video"
                />

                <AssetsList
                  assetsListConverter={list => this._assetsListConverter(list, 'image')}
                  title="Poster"
                  list={get(files, '[0].preview', [])}
                  path="assets"
                  domain="exercises"
                  valuePath="exercise.files[0].preview"
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
  exerciseState          : state.createDiagnosisQuestion.exercise,
  commonReducer          : state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateExercise);
import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import DiagnosisRulesComponent      from '.././createDiagnosisQuestion/diagnosisRules';
import { browserHistory }           from 'react-router'
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  findUniqueKey,
  updateQuestionCreate,
  getExerciseById,
  findArea }                        from '../../../../actions';
import { onChange }                 from '../../../../actions/common';
import { AsyncCreatable }           from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../common/Input/Input';
import SELECT                       from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Tabs, { Tab }                from 'material-ui/Tabs';
import * as moment from "moment";
import { TIME_FORMAT_DOTS }  from '../../../../utils/constants/pageContent';
import IconButton            from 'material-ui/IconButton';
import Delete                from 'material-ui-icons/Delete';
import ExercisesAssetsModal from './exercisesAssetsModal';
import { get }                      from 'lodash';

class CreateExerciseComponent extends Component {
  state = {
    titleLang: 'en',
    informationLang: 'en',
    instructionLang: 'en',
    chooseFiles: false
  };

  constructor(props) {
    super(props);
//    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillMount() {
    if (this.props.params.id) {
      getExerciseById('exercises', 'exercises', this.props.params.id);
    }
    else {
//      const newOne = Object.assign({}, DEFAULT_LEVEL);
//      updateCrateQuestionFields([newOne], 'packageLevels');
    }
  }

  componentWillUnmount() { clearCreateQuestion(); }


  done = (value) => {
    const { id, title, comments, text, instruction, information, name } = value;
    const result = {
      title,
      comments,
      text,
      information,
      instruction,
      name,
      file_ids: [19]
    };

    !this.props.routeParams.id ?
      diagnosisQuestionCreate('exercises', 'exercises', result)
      .then(() => browserHistory.push(`/matrix-setup/exercises`)) :

      updateQuestionCreate('exercises', 'exercises', {...result, id: id}, id)
      .then(() => browserHistory.push(`/matrix-setup/exercises`))

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
    debugger
    updateCrateQuestionFields(filtered, `exercise.files.data`)
  };

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        packageLevels,
        exerciseState
      },

      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
      params: {
        packageId
      }
    } = this.props;

    const {name, comments, title, information, instruction, files} = this.props.exerciseState;

    return (
      <div id="create-question">
        <div className="page-sub-header">
          <span>Create Exercise</span>
          <div className="nav-buttons">

            <Button onClick={this.cancel}>
              Cancel
            </Button>

            <Button raised
                    dense
                    onClick={() => this.done(this.props.exerciseState)}
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
                    id='exercise.name'
                    value={name}
                    reducer={createDiagnosisQuestion}
                    label={ 'Notes' }
                    placeholder={ 'Notes' }
                  />
                </Grid>
              </Grid>

              <Grid container className="row-item">
                <Grid item xs={12}>
                  <Input
                    id='exercise.comments'
                    value={comments}
                    reducer={createDiagnosisQuestion}
                    label={ 'Comments' }
                    placeholder={ 'Comments' }
                    multiline={true}
                    rows="5"
                    cols="60"
                  />
                </Grid>
              </Grid>

              {/* Question !!! */}
              <Grid container className="row-item">
                <Grid item xs={12}>
                  {this.state.titleLang === 'en' ?
                    <Input
                      id='exercise.title.en'
                      value={title && title.en}
                      reducer={createDiagnosisQuestion}
                      label={ 'Title' }
                      placeholder={ 'Title' }
                    /> :
                    <Input
                      id='exercise.title.swe'
                      value={title && title.swe}
                      reducer={createDiagnosisQuestion}
                      label={ 'Title' }
                      placeholder={ 'Title' }
                    />
                  }
                </Grid>
                <Tabs
                  value={this.state.titleLang}
                  onChange={(event, value) => this.handleQuestionLangChange(event, value, 'titleLang')}
                  indicatorColor="primary"
                  className="tab-lang"
                  textColor="primary"
                  centered
                >
                  <Tab label="English" value="en" />
                  <Tab label="Sweden"  value="swe" />
                </Tabs>
              </Grid>

              <Typography type="title" style={{marginTop: '40px'}}>
                Exercise Information
              </Typography>


              <Grid container className="row-item">
                <Grid item xs={12}>
                  {this.state.informationLang === 'en' ?
                    <Input
                      id='exercise.information.en'
                      value={information && information.en}
                      reducer={createDiagnosisQuestion}
                      label={ 'Information' }
                      placeholder={ 'Information' }
                      multiline={true}
                      rows="5"
                      cols="60"
                    /> :
                    <Input
                      id='exercise.information.swe'
                      value={information && information.swe}
                      reducer={createDiagnosisQuestion}
                      label={'Information' }
                      placeholder={ 'Information' }
                      multiline={true}
                      rows="5"
                      cols="60"
                    />
                  }
                </Grid>
                <Tabs
                  value={this.state.informationLang}
                  onChange={(event, value) => this.handleQuestionLangChange(event, value, 'informationLang')}
                  indicatorColor="primary"
                  className="tab-lang"
                  textColor="primary"
                  centered
                >
                  <Tab label="English" value="en" />
                  <Tab label="Sweden"  value="swe" />
                </Tabs>
              </Grid>

              <Typography type="title"  style={{marginTop: '40px'}}>
                Exercise Instruction
              </Typography>

              <Grid container className="row-item">
                <Grid item xs={12}>
                  {this.state.instructionLang === 'en' ?
                    <Input
                      id='exercise.instruction.en'
                      value={instruction && instruction.en}
                      reducer={createDiagnosisQuestion}
                      label={ 'Instruction' }
                      placeholder={ 'Instruction' }
                      multiline={true}
                      rows="5"
                      cols="60"
                    /> :
                    <Input
                      id='exercise.instruction.swe'
                      value={instruction && instruction.swe}
                      reducer={createDiagnosisQuestion}
                      label={'Instruction' }
                      placeholder={ 'Instruction' }
                      multiline={true}
                      rows="5"
                      cols="60"
                    />
                  }
                </Grid>
                <Tabs
                  value={this.state.instructionLang}
                  onChange={(event, value) => this.handleQuestionLangChange(event, value, 'instructionLang')}
                  indicatorColor="primary"
                  className="tab-lang"
                  textColor="primary"
                  centered
                >
                  <Tab label="English" value="en" />
                  <Tab label="Sweden"  value="swe" />
                </Tabs>
              </Grid>



            </div>
          </Grid>

          <Grid item
                md={6}
                sm={12}
                className="create-question-body">
            <div className="main-question">

              <Grid container>
                <Grid item xs={12}>
                  <Typography type="title">
                    Assets
                  </Typography>
                </Grid>
              </Grid>


              <Grid item xs={12} className="package-level-exercises">
                {files && files.data.map((item, index) => {
                  const { id, title, created_at } = item;
                  const created = moment.unix(created_at).format('DD.MM.YYYY');

                  return <div key={index} className="package-level-exercises-item">

                    <div className="exercises-information">

                      <Typography type="subheading" className="title">
                        {item.name_origin || item.name_real || 'Title'}
                      </Typography>

                      <Typography type="body2">
                        Uploaded { created }
                      </Typography>

                    </div>

                    <div className="delete-icon">

                      <IconButton aria-label="Delete">

                        <Delete onClick={() => this.handleDelete(id)} />

                      </IconButton>
                    </div>
                  </div>
                })}
              </Grid>


              <Grid container>
                <Grid item xs={12}>
                  <Button color="primary" onClick={() => this.openChooseFiles(true)}>
                    OPEN RESOURCES
                  </Button>



                  {this.state.chooseFiles &&
                  <ExercisesAssetsModal
                    open={this.state.chooseFiles}
                    isSelected={(files && files.data) || []}
                    handleRequestClose={(value) => this.openChooseFiles(value)}/>}
                </Grid>
              </Grid>
            </div>

          </Grid>


        </Grid>
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

export default  connect(mapStateToProps, mapDispatchToProps)(CreateExerciseComponent);
import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  updateQuestionCreate,
  getExerciseById,
}                                   from '../../../../../actions';
import { onChange }                 from '../../../../../actions/common';
import { AsyncCreatable }           from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../../common/Input/Input';
import Tabs, { Tab }                from 'material-ui/Tabs';
import { get }                      from 'lodash';
import {
  BlockDivider,
  AssetsList
}                                   from '../../../../common';
import MatrixPreLoader              from '../../matrixPreloader';
import { submitTabs }               from '../../../../../utils/matrix';


class CreateExerciseComponent extends Component {
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
      this.setState({loading: true});
      getExerciseById('exercises', 'exercises', this.props.params.id).then(() => {
        this.setState({loading: false});

      });
    }
    else {
//      const newOne = Object.assign({}, DEFAULT_LEVEL);
//      updateCrateQuestionFields([newOne], 'packageLevels');
    }
  }

  componentWillUnmount() { clearCreateQuestion(); }


  done = (value) => {
    const { id, title, comments, text, instruction, information, name, files, errors } = value;
    const validValue = { title, comments, instruction, information, name };
    const result = {
      title,
      comments,
      text: 'error',
      information,
      instruction,
      name,
      file_ids: files ? files.data.map(el => el && el.id) : []
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
      routeParams: { id },
    } = this.props;

    const { name, comments, title, information, instruction, files } = this.props.exerciseState;
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

        {  id && this.state.loading ?
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
                    id='exercise.name'
                    value={name}
                    reducer={createDiagnosisQuestion}
                    label={ 'Notes' }
                    className="MUIControl"
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
                  {this.state.titleLang === 'en' ?
                    <Input
                      id='exercise.title.en'
                      value={title && title.en}
                      reducer={createDiagnosisQuestion}
                      label={ 'Title' }
                      className="MUIControl"
                      placeholder={ 'Title' }
                    /> :
                    <Input
                      id='exercise.title.swe'
                      value={title && title.swe}
                      reducer={createDiagnosisQuestion}
                      label={ 'Title' }
                      className="MUIControl"
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
                  <Tab label="English" value="en" className="MUITab"/>
                  <Tab label="Swedish"  value="swe" className="MUITab"/>
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
                      className="MUIControl"
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
                      className="MUIControl"
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
                  <Tab label="English" value="en" className="MUITab"/>
                  <Tab label="Swedish"  value="swe" className="MUITab"/>
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
                      value={!!instruction ?  instruction.en : ''}
                      reducer={createDiagnosisQuestion}
                      label={ 'Instruction' }
                      placeholder={ 'Instruction' }
                      multiline={true}
                      className="MUIControl"
                      rows="5"
                      cols="60"
                    /> :
                    <Input
                      id='exercise.instruction.swe'
                      value={!!instruction ? instruction.swe : ''}
                      reducer={createDiagnosisQuestion}
                      label={'Instruction' }
                      placeholder={ 'Instruction' }
                      className="MUIControl"
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
                  <Tab label="English" value="en"   className="MUITab"/>
                  <Tab label="Swedish"  value="swe"  className="MUITab"/>
                </Tabs>
              </Grid>

            </div>


            <AssetsList
              list={ files ? files.data : []}
              path="assets"
              domain="exercises"
              valuePath="exercise.files.data"
            />

          </BlockDivider>
        }
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
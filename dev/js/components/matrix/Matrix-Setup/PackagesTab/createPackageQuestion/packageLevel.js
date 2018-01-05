import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  findUniqueKey,
  updateQuestionCreate,
  getPackagenById,
  deletePackageLevel
}                                   from '../../../../../actions';
import { onChange }                 from '../../../../../actions/common';
import { AsyncCreatable }           from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../../common/Input/Input';
import SELECT                       from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Tabs, { Tab }                from 'material-ui/Tabs';
import PackageExercises             from './packageExercises';
import { CircularProgress }         from 'material-ui/Progress';
import PackageExercisesModal        from './packageExercisesModal';

export const THERAPY = [
  { value: '1',  label: 'Daily'},
  { value: '2',  label: 'Every other day'},
  { value: '7',  label: 'Weekly'},
  { value: '2H', label: 'Every two hours'},
  { value: 'ME', label: 'Morning and evening'},
];
class PackageLevelComponent extends Component {
  state = { loading: true, chooseExercises: false };


  componentDidMount() {
    const {
      packageId,
      level                   : { id, exercise_ids },
      createDiagnosisQuestion : { packageLevels },
      index
    } = this.props;
  }

  openChooseExercises = (chooseExercises) => this.setState({ chooseExercises });

  deleteLevel = ({id}, index) => {
    deletePackageLevel(id, index);
    this.props.changeTab();
  };

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        bodyAreas,
        questionKey,
        packageType,
        packageLevels,

      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
      index,
      level
    } = this.props;

    const therapy_continuity = packageLevels[index].therapy_continuity;
    const exercise_ids       = packageLevels[index].exercise_ids;

    return <div>
      <Grid container className="row-item">
        <Grid item xs={2}>
          <Typography type="caption">
            VAS, %
          </Typography>
          <Input
            id={`packageLevels[${index}].level_up_properties.vas`}
            type='number'
            max="100"
            min="1"
            reducer={ createDiagnosisQuestion }
            placeholder={ L_CREATE_QUESTION.enterTitle }
          />
        </Grid>

        <Grid item xs={2}>
          <Typography type="caption">
            VAS, min
          </Typography>
          <Input
            id={`packageLevels[${index}].level_up_properties.vas_min`}
            type='number'
            max="100"
            min="1"
            reducer={ createDiagnosisQuestion }
            placeholder={ L_CREATE_QUESTION.enterTitle }
          />
        </Grid>

        <Grid item xs={2}>
          <Typography type="caption">
            Sessions
          </Typography>
          <Input
            id={`packageLevels[${index}].level_up_properties.sessions`}
            type='number'
            min="1"
            reducer={this.props.createDiagnosisQuestion}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography type="caption" style={{marginBottom: '16px'}}>
              Therapy continuity
          </Typography>
          <SELECT
            value={therapy_continuity}
            onChange={(event) =>
              updateCrateQuestionFields(event.target.value, `packageLevels[${index}].therapy_continuity`)}
            className="MuiFormControlDEFAULT"
            label="Therapy continuity"
            >
            {THERAPY.map((item, index) => (
              <MenuItem
                key={item.value}
                value={item.value}
                style={{
                  fontWeight: THERAPY.indexOf(item.value) !== -1 ? '500' : '400',
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </SELECT>
        </Grid>
      </Grid>

      <Grid container className="package-level-exercises">
        <Grid item xs={12} style={{display: 'flex', flexDirection: 'row'}}>
          <Typography type="title">
            Exercises
          </Typography>
          {/*{this.state.loading && <CircularProgress size={20}/>}*/}
        </Grid>


        <PackageExercises exercises={exercise_ids} level={index}/>

        <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button color="primary" onClick={() => this.openChooseExercises(true)}>
            OPEN EXERCISES
          </Button>

          <Button color="primary" onClick={() => this.deleteLevel(level, index)}>
            DELETE LEVEL
          </Button>

          {this.state.chooseExercises &&
          <PackageExercisesModal
            level={index}
            open={this.state.chooseExercises}
            isSelected={exercise_ids || []}
            handleRequestClose={(value) => this.openChooseExercises(value)}/>}
        </Grid>
      </Grid>
    </div>
  }
}

const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  commonReducer          : state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(PackageLevelComponent);
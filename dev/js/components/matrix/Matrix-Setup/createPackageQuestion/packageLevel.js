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
  getPackagenById,
  getPackageLevel
}                                   from '../../../../actions';
import { onChange }                 from '../../../../actions/common';
import { AsyncCreatable }           from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../common/Input/Input';
import SELECT                       from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Tabs, { Tab }                from 'material-ui/Tabs';
import PackageExercises             from './packageExercises';

export const THERAPY = [
  { value: '1',  label: 'Daily'},
  { value: '2',  label: 'Every other day'},
  { value: '7',  label: 'Weekly'},
  { value: '2H', label: 'Every two hours'},
  { value: 'ME', label: 'Morning and evening'},
];
class PackageLevelComponent extends Component {

  componentDidMount() {
    const {
      params: {
        packageId,
        levelId
      },
      createDiagnosisQuestion: {
        packageLevels
      }
    } = this.props;

    if (packageId) {
      const { id, exercise_ids } = packageLevels[levelId];
      getPackageLevel('exercises', 'getExercises', exercise_ids)
    }
  }

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        bodyAreas,
        questionKey,
        packageType,
        packageLevels,
        exercise_ids
      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
    } = this.props;

    return <div>
      <Grid container className="row-item">
        <Grid item xs={2}>
          <Typography type="caption">
            VAS, %
          </Typography>
          <Input
            id='questionTitle'
            value={questionTitle}
            reducer={ createDiagnosisQuestion }
            placeholder={ L_CREATE_QUESTION.enterTitle }
          />
        </Grid>
        <Grid item xs={2}>
          <Typography type="caption">
            VAS, min
          </Typography>
          <Input
            id='questionTitle'
            value={questionTitle}
            reducer={ createDiagnosisQuestion }
            placeholder={ L_CREATE_QUESTION.enterTitle }
          />
        </Grid>
        <Grid item xs={2}>
          <Typography type="caption">
            Sessions
          </Typography>
          <Input
            id='questionTitle'
            value={questionTitle}
            reducer={ createDiagnosisQuestion }
            placeholder={ L_CREATE_QUESTION.enterTitle }
          />
        </Grid>
        <Grid item xs={3}>
          <Typography type="caption" style={{marginBottom: '16px'}}>
              Therapy continuity
          </Typography>
          <SELECT
            value={''}
            onChange={(event) =>  updateCrateQuestionFields(event.target.value, 'therapyContinuity')}
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
        <Grid item xs={12} >
          <Typography type="title">
            Exercises
          </Typography>
        </Grid>

        {exercise_ids.map((item, index) =>
          <Grid item xs={12} key={index}>
            <PackageExercises exercises={item}/>
          </Grid>)}

        <Grid item xs={12}>
          <Button color="primary">
            OPEN EXERCISES
          </Button>
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
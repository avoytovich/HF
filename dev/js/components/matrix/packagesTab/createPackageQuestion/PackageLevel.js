import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import {
  updateCrateQuestionFields,
  deletePackageLevel
}                                   from '../../../../actions';
import { onChange }                 from '../../../../actions/common';
import { AsyncCreatable }           from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../common/Input/Input';
import SELECT                       from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import PackagePickedExercises             from './PackagePickedExercises';
import { CircularProgress }         from 'material-ui/Progress';
import PickPackageExercisesModal        from './PickPackageExercisesModal';
import {
  debounce,
  get,
  groupBy,
  find,
}                               from 'lodash';

export const THERAPY = [
  { value: 'daily',           label: 'Daily'               },
  { value: 'everyOtherDay',   label: 'Every other day'     },
  { value: 'weekly',          label: 'Weekly'              },
  { value: 'everyTwoHours',   label: 'Every two hours'     },
  { value: 'morningEvening',  label: 'Morning and evening' },
];

const ORDER = {
  1: {},
};

class PackageLevel extends Component {
  state = {
    loading: true,
    chooseExercises: false,
    currentOrder: null,
  };

  componentDidMount() {
    const {
      packageId,
      level: {
        id,
        exercise_ids
      },
      createDiagnosisQuestion: {
        packageLevels
      },
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
      index,
      level,
      therapy_continuity,
      exercises = [],
    } = this.props;

    const { currentOrder } = this.state;

    return <div>
      <Grid container className="row-item">
        <Grid item xs={2} className="package-level-counts">
          <Typography type="caption">
            Vas, trend down
          </Typography>
          <Input
            id={`packageLevels.${index}.level_up_properties.vas_trend_down`}
            type='number'
            min="1"
            className="MUIControl"
            reducer={ createDiagnosisQuestion }
            placeholder={'Enter Vas, trend down'}
          />
        </Grid>

        <Grid item xs={2} className="package-level-counts">
          <Typography type="caption">
            VAS, min
          </Typography>
          <Input
            id={`packageLevels.${index}.level_up_properties.vas_min`}
            type='number'
            min="1"
            className="MUIControl"
            reducer={ createDiagnosisQuestion }
            placeholder={'Enter VAS, min'}
          />
        </Grid>

        <Grid item xs={2} className="package-level-counts">
          <Typography type="caption">
            Sessions
          </Typography>
          <Input
            id={`packageLevels.${index}.level_up_properties.package_level_sessions`}
            type='number'
            min="1"
            className="MUIControl"
            reducer={createDiagnosisQuestion}
            placeholder={'Enter Sessions'}
          />
        </Grid>
        <Grid item xs={2} className="package-level-counts">
          <Typography type="caption">
            Package Level Days
          </Typography>
          <Input
            id={`packageLevels.${index}.level_up_properties.package_level_days`}
            type='number'
            min="1"
            className="MUIControl"
            reducer={ createDiagnosisQuestion }
            placeholder={'Enter Package Level Days'}
          />
        </Grid>
        <Grid item xs={4} className="package-level-counts">
          <Typography type="caption" style={{marginBottom: '16px'}}>
              Therapy continuity
          </Typography>
          <SELECT
            value={therapy_continuity}
            onChange={(event) => updateCrateQuestionFields(
              event.target.value,
              `packageLevels.${index}.therapy_continuity`
            )}
            className="MuiFormControlDEFAULT package-level-therapy-continuity"
            label="Therapy continuity"
            >
            {
              THERAPY.map((item, index) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  style={{
                    fontWeight: THERAPY.indexOf(item.value) !== -1 ? '500' : '400',
                  }}
                >
                  {item.label}
                </MenuItem>
              ))
            }
          </SELECT>
        </Grid>
      </Grid>

      <Grid container className="package-level-exercises">
        <Grid item xs={12}>
          <Typography type="title">
            Exercises
          </Typography>
          <Typography>
            *total probability amount in session should be equal to 1.
          </Typography>
          {/*{this.state.loading && <CircularProgress size={20}/>}*/}
        </Grid>
      </Grid>
      {
        [1, 2, 3, 4].map((order) => {
          const exercisesForCurrentPosition = exercises.filter(ex =>ex.order === order);
          return (
            <Grid key={order} container className="package-level-exercises">
              <Grid item xs={12} >
                <Typography type="title">
                  Position {order}
                </Typography>
                {/*{this.state.loading && <CircularProgress size={20}/>}*/}
              </Grid>

              <PackagePickedExercises
                order={order}
                exercises={exercisesForCurrentPosition}
                level={index}
              />

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  color="primary"
                  onClick={() => this.setState({
                      currentOrder   : order,
                      chooseExercises: order
                    })
                  }
                >
                  OPEN EXERCISES
                </Button>

                <Button
                  color="primary"
                  disabled={packageLevels.length <= 1}
                  onClick={() => this.deleteLevel(level, index)}
                >
                  DELETE LEVEL
                </Button>


                {
                  this.state.chooseExercises == order &&
                  <PickPackageExercisesModal
                    level={index}
                    order={currentOrder}
                    levelExercises={exercises}
                    open={this.state.chooseExercises}
                    isSelected={exercisesForCurrentPosition}
                    handleRequestClose={(value) => this.openChooseExercises(value)}
                  />
                }
              </Grid>
            </Grid>
          )
        })
      }

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

export default  connect(mapStateToProps, mapDispatchToProps)(PackageLevel);
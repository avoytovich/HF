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


class CreateExerciseComponent extends Component {
  state = {};

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
    const { bodyAreas, questionKey, questionTitle, packageLevels, therapyContinuity, packageType } = value;

    const result = {
      key      : questionKey,
      body_area: bodyAreas.key || bodyAreas.value,
      title    : questionTitle,
      type     : packageType,
      package_levels : packageLevels
    };

    !this.props.routeParams.id ?
      diagnosisQuestionCreate('exercises', 'packages', result)
      .then(() => browserHistory.push(`/matrix-setup/exercises`)) :

      diagnosisQuestionCreate('exercises', 'packages', result, this.props.routeParams.packageId)
      .then(() => browserHistory.push(`/matrix-setup/exercises`))

  };

  cancel = () => browserHistory.push(`/matrix-setup/exercises`);

  handleTabChange = (event, tab) => {
    this.setState({ tab });
//    browserHistory.push(`/packages-create/${this.props.routeParams.packageId}?level=${tab}`);
  };

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        bodyAreas,
        questionKey,
        packageType,
        packageLevels
      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
      params: {
        packageId
      }
    } = this.props;


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
                    onClick={() => this.done(createDiagnosisQuestion)}
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
                    Package
                  </Typography>
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
  commonReducer          : state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateExerciseComponent);
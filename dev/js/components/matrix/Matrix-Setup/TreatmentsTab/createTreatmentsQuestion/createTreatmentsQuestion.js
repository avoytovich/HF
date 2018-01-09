import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import {
  DiagnosisRulesComponent,
  BlockDivider,
  AsyncAreaSelect,
  UniqueKey
}                                   from '../../../../common';
import { browserHistory }           from 'react-router'
import {
  updateCrateQuestionFields,
  clearCreateQuestion,
  getTreatmentById,
  getPackagenById
}                                   from '../../../../../actions';
import { Async }                    from 'react-select';
import Button                       from 'material-ui/Button';
import Grid                         from 'material-ui/Grid';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../../common/Input/Input';
import { submitTabs }               from '../../../../../utils/matrix';
import MatrixPreLoader              from '../../matrixPreloader';
import TreatmentPackageLevel        from './treatmentPackageLevel';

class CreateTreatmentsComponent extends Component {
  state = {
    questionType    : 'treatments',
    keyIsUniqueError: '',
    treatmentsLevels: [],
  };

  constructor(props) {
    super(props);
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillMount() {
    if (this.props.routeParams.id) {
      getTreatmentById('diagnostics', 'treatments', this.props.routeParams.id)
        .then(res => {
        const {package_id, package_level_id} = res.package;

          getPackagenById('exercises', 'packages', package_id, true).then((_res) => {
            const {data} = _res.packageLevels;
            const levelsList = data.map(el => el && {label: el.level, value: el.id, id: el.id});
            updateCrateQuestionFields(levelsList, 'levelsList');
            const {id, title} = _res;
            const treatmentsPackage = {value: id, label: title, id};
            updateCrateQuestionFields(treatmentsPackage, 'treatmentsPackage');

          });
        });
    }
  }


  done = (value) => {
    const { areaIds, questionKey, questionTitle, treatmentsLevels, treatmentsPackage, rules } = value;
    const result = {
      areaIds,
      rule              : rules[0],
      key               : questionKey,
      title             : questionTitle,

      package_level_id  : treatmentsLevels,
      package_id        : treatmentsPackage.id,

      package: {
        package_id: treatmentsPackage.id,
        package_level_id: treatmentsLevels
      }
    };

    const _result = this.props.routeParams.id ? Object.assign({}, result, {id: this.props.routeParams.id}) : result;

    submitTabs(
      'diagnostics',
      'treatments',
      _result,
      '/matrix-setup/treatments',
      this.props.routeParams.id
    );
  };

  cancel = () => browserHistory.push(`/matrix-setup/treatments`);

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        areaIds,
        questionKey,
        treatmentsLevels,
        treatmentsPackage,
        levelsList
      },
      routeParams: { id },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
    } = this.props;

    return (
      <div id="create-question">
        <div className="page-sub-header">
          <span>Create Treatment</span>
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

        {  id && !questionKey ?
          <MatrixPreLoader
            left="4"
            right="2"
          />
          :
          <BlockDivider title="Treatment">
            <div className="main-question" style={{width:'100%'}}>

              <Grid className="title">
                <Typography type="title" gutterBottom>
                  Treatment
                </Typography>
              </Grid>

              {/*Title and Body Area*/}
              <Grid container className="row-item">
                <Grid item md={6} sm={12}>
                  <Input
                    id='questionTitle'
                    className="MUIControl"
                    value={questionTitle}
                    reducer={ createDiagnosisQuestion }
                    label={ L_CREATE_QUESTION.questionTitle }
                    placeholder={ L_CREATE_QUESTION.enterTitle }
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <AsyncAreaSelect
                    domain="diagnostics"
                    path="findArea"
                    valuePath="areaIds"
                    idKey="create_treatment_question"
                  />
                </Grid>
              </Grid>

              {/* Question Key */}
              <UniqueKey
                domain="diagnostics"
                path="findByKey"
                questionKey={questionKey}
                id="questionKey"
                reducer="createDiagnosisQuestion"
              />


              {/*Package and Start level*/}
              <TreatmentPackageLevel
                packageItem={treatmentsPackage}
                levelItem={treatmentsLevels}
                area={areaIds}
                levelsList={levelsList || []}
              />

            </div>
            <div className="rules">
              <DiagnosisRulesComponent
                page="treatments"
                type="diagnostic"
                area={areaIds}
                step={null}
                showTitle={true}
              />
            </div>
          </BlockDivider>
        }

      </div>
    )
  }
}
const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  commonReducer          : state.commonReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateTreatmentsComponent);
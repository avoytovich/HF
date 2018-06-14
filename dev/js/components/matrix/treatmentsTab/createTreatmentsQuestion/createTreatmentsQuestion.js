import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  DiagnosisRulesComponent,
  BlockDivider,
  AsyncAreaSelect,
  UniqueKey
} from "../../../common";
import { browserHistory } from "react-router";
import {
  updateCrateQuestionFields,
  clearCreateQuestion,
  getTreatmentById,
  getPackagenById
} from "../../../../actions";
import { Async } from "react-select";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Input from "../../../common/Input/Input";
import { submitTabs } from "../../../../utils";
import MatrixPreLoader from "../../matrixPreloader";
import TreatmentPackageLevel from "./TreatmentPackageLevel";
import { CreateItemNavButtons } from "../../../common";

class CreateTreatmentsComponent extends Component {
  state = {
    questionType: "treatments",
    keyIsUniqueError: "",
    treatmentsLevels: [],
    loading: false
  };

  constructor(props) {
    super(props);
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, "page");
  }

  componentWillMount() {
    if (this.props.routeParams.id) {
      this.setState({ loading: true });

      getTreatmentById(
        "diagnostics",
        "treatments",
        this.props.routeParams.id
      ).then(res => {
        const { package_id, package_level_id } = res.package;
        // package_id && getPackagenById('exercises', 'packages', package_id, true).then((_res) => {
        package_id &&
          getPackagenById("exercises", "packages", package_id, true).then(
            _res => {
              const { data } = _res.packageLevels;
              const levelsList = data.map(
                el => el && { label: el.level, value: el.id, id: el.id }
              );
              updateCrateQuestionFields(levelsList, "levelsList");
              const { id, title } = _res;
              const treatmentsPackage = { value: id, label: title, id };
              updateCrateQuestionFields(treatmentsPackage, "treatmentsPackage");
            }
          );

        this.setState({ loading: false });
      });
    }
  }

  done = value => {
    const {
      areaIds,
      questionKey,
      questionTitle,
      treatmentsLevels,
      treatmentsPackage,
      testing,
      rules,
      errors
    } = value;
    const validValue = {
      questionKey,
      questionTitle,
      treatmentsLevels,
      treatmentsPackage: treatmentsPackage.hasOwnProperty("id")
        ? treatmentsPackage
        : { id: "" }
    };

    const result = {
      areaIds,
      rule: rules && rules.length ? { and: rules } : [],
      key: questionKey,
      title: questionTitle,
      testing,

      package_level_id: treatmentsLevels,
      package_id: treatmentsPackage.id,

      package: {
        package_id: treatmentsPackage.id,
        package_level_id: treatmentsLevels
      }
    };

    const _result = this.props.routeParams.id
      ? Object.assign({}, result, { id: this.props.routeParams.id })
      : result;

    submitTabs(
      validValue,
      errors,
      "diagnostics",
      "treatments",
      _result,
      "/matrix-setup/treatments",
      this.props.routeParams.id
    );
  };

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        areaIds,
        questionKey,
        treatmentsLevels,
        treatmentsPackage,
        levelsList,
        testing,
        errors
      },
      routeParams: { id },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION }
      },
      router
    } = this.props;

    return (
      <div id="create-question">
        <CreateItemNavButtons
          title={"Create Treatment"}
          showSwitch={true}
          showLangSwitcher={false}
          switchChecked={testing}
          switchLabel={"Live"}
          onSwitchChange={(e, value) =>
            updateCrateQuestionFields(!value, "testing")
          }
          
          router={router}
          cancelLabel={"Cancel"}
          onSaveClick={() => this.done(createDiagnosisQuestion)}
          saveLabel={"Save"}
        />
        <div className="create-question-sub-container">
          {id && this.state.loading ? (
            <MatrixPreLoader left="4" right="2" />
          ) : (
            <BlockDivider title="Treatment">
              <div className="main-question" style={{ width: "100%" }}>
                <Grid className="title">
                  <Typography type="title" gutterBottom>
                    Treatment
                  </Typography>
                </Grid>

                {/*Title and Pain Area*/}
                <Grid container className="row-item">
                  <Grid item md={6} sm={12}>
                    <Input
                      id="questionTitle"
                      className="MUIControl"
                      value={questionTitle}
                      reducer={createDiagnosisQuestion}
                      label={L_CREATE_QUESTION.questionTitle}
                      placeholder={L_CREATE_QUESTION.enterTitle}
                    />
                  </Grid>
                  {/* <Grid item md={6} sm={12}>
                    <AsyncAreaSelect
                      domain="diagnostics"
                      path="findArea"
                      valuePath="areaIds"
                      idKey="create_treatment_question"
                    />
                  </Grid> */}
                </Grid>

                {/* Question Key */}
                <UniqueKey
                  domain="diagnostics"
                  path="findByKey"
                  questionKey={questionKey}
                  id="questionKey"
                  currentId={id}
                  label="Treatment key*"
                  reducer="createDiagnosisQuestion"
                />

                {/*Package and Start level*/}
                <TreatmentPackageLevel
                  packageItem={treatmentsPackage}
                  levelItem={treatmentsLevels}
                  area={areaIds}
                  packageError={errors["treatmentsPackage"]}
                  levelError={errors["treatmentsLevels"]}
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
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  commonReducer: state.commonReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatch }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTreatmentsComponent);

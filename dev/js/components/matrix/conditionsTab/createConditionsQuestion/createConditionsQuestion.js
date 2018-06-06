import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { submitTabs } from "../../../../utils";
//Actions
import {
  updateCrateQuestionFields,
  clearCreateQuestion,
  getConditionById
} from "../../../../actions";
//Components
import {
  DiagnosisRulesComponent,
  BlockDivider,
  AsyncAreaSelect,
  UniqueKey
} from "../../../common";
import MatrixPreLoader from "../../matrixPreloader";
import { CreateItemNavButtons } from "../../../common";

//UI
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Input from "../../../common/Input/Input";
import { validateMatrix } from "../../../../utils/validation/validateMatrix";

class CreateConditionComponent extends Component {
  state = {
    questionType: "condition",
    loading: false
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, "page");

    if (this.props.routeParams.id) {
      this.setState({ loading: true });
      getConditionById(
        "diagnostics",
        "getConditionById",
        this.props.routeParams.id
      ).then(el => this.setState({ loading: false }));
    }
  }

  done = value => {
    const {
      areaIds,
      questionKey,
      questionTitle,
      rules,
      testing,
      errors
    } = value;
    const validValue = { questionKey, questionTitle };
    const result = {
      areaIds,
      rule: rules && rules.length ? { and: rules } : [],
      key: questionKey,
      title: questionTitle,
      testing
    };

    submitTabs(
      validValue,
      errors,
      "diagnostics",
      "conditions",
      result,
      "/matrix-setup/conditions",
      this.props.routeParams.id
    );
  };

  cancel = () => browserHistory.push(`/matrix-setup/conditions`);

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        questionKey,
        sequence,
        areaIds,
        testing
      },
      routeParams: { id },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION }
      }
    } = this.props;

    return (
      <div id="create-question">
        <CreateItemNavButtons
          title={"Create Condition"}
          showSwitch={true}
          switchChecked={testing}
          showLangSwitcher={false}
          switchLabel={"Live"}
          onSwitchChange={(e, value) =>
            updateCrateQuestionFields(!value, "testing")
          }
          onCancelClick={this.cancel}
          cancelLabel={"Cancel"}
          onSaveClick={() => this.done(createDiagnosisQuestion)}
          saveLabel={"Save"}
        />

        <div className="create-question-sub-container">
          {id && this.state.loading ? (
            <MatrixPreLoader left="3" right="2" />
          ) : (
            <BlockDivider title="Condition">
              <div className="main-question" style={{ width: "100%" }}>
                <Grid className="title">
                  <Typography type="title" gutterBottom>
                    Condition
                  </Typography>
                </Grid>

                {/*Title and Pain Area*/}
                <Grid container className="row-item">
                  <Grid item md={6} sm={12}>
                    <Input
                      id="questionTitle"
                      value={questionTitle}
                      className="MUIControl"
                      reducer={createDiagnosisQuestion}
                      label={L_CREATE_QUESTION.questionTitle}
                      placeholder={L_CREATE_QUESTION.enterTitle}
                    />
                  </Grid>
                  {/* <Grid item md={6} sm={12} >
                <AsyncAreaSelect
                  domain="diagnostics"
                  path="findArea"
                  valuePath="areaIds"
                  idKey="create_condition_question"
                />
              </Grid> */}
                </Grid>

                {/* Question Key */}
                <UniqueKey
                  domain="diagnostics"
                  path="findCondByKey"
                  questionKey={questionKey}
                  id="questionKey"
                  currentId={id}
                  label="Condition key*"
                  reducer="createDiagnosisQuestion"
                />
              </div>

              <div className="rules">
                <DiagnosisRulesComponent
                  page="conditions"
                  type="diagnostic"
                  area={areaIds}
                  step={sequence}
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
)(CreateConditionComponent);

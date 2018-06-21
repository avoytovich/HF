import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { get } from "lodash";
// Actions
import {
  updateCrateQuestionFields,
  getQuestionById
} from "../../../../actions";
// Components
import { Input } from "../../../common";
import {
  AssetsList,
  DiagnosisRulesComponent,
  AsyncAreaSelect,
  UniqueKey,
  BlockDivider
} from "../../../common";
import RulesLinks from "../../evaluationsTab/createEvaluationTab/RulesLinks";
import SequenceBlock from "./SequenceBlock";
import DiagnosticQuestion from "./DiagnosticQuestion";
import DiagnosticAnswers from "./DiagnosticAnswers";
import PackageLevelsList from "../../levelUpTab/createLevelUpQuestion/PackageLevelsList";
// UI
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import MUISelect from "material-ui/Select";
import Menu, { MenuItem } from "material-ui/Menu";
import { FormControl, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import { Async } from "react-select";
import { CONTENT_TYPE_LIST } from "../../../../utils";
import cloneDeep from "lodash/cloneDeep";

class DiagnosisTypeQuestion extends Component {
  state = {
    questionType: "diagnosis",
    selectedValue: "single",
    keyIsUniqueError: ""
  };

  componentWillMount() {
    if (this.props.currentId) {
      getQuestionById("diagnostics", "createQuestion", this.props.currentId);
    }
  }

  _assetsListConverter = (list, filterKey) => {
    let newList = cloneDeep(list);
    return newList.filter(assets => assets.type === filterKey);
  };

  render() {
    const {
      sequenceList,
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        areaIds,
        question,
        questionKey,
        sequence,
        sequenceType,
        answerType,
        content_type,
        levelup_result,
        diagnostic_assets,
        evaluation_result,
        questionAnswerLang,
        files
      },
      page,
      reqType,
      packages,
      packageLevelsList,
      currentId,
      showLevelUp,
      hideArea,
      rules_links,
      SequenceBlockReqType
    } = this.props;


    let labelLang = "";
    let valueVideoPath = "";
    //let valuePosterPath = '';
    switch (questionAnswerLang) {
      case "swe":
        labelLang = "swe";
        valueVideoPath = "files[swe].video";
        //valuePosterPath = 'files[swe].preview';
        break;
      default:
        labelLang = "en";
        valueVideoPath = "files[en].video";
      //valuePosterPath = 'files[en].preview';
    }

    return (
      <BlockDivider title="Question">
        <div className="main-question" style={{ width: "100%" }}>
          <Grid className="title">
            <Typography type="title" gutterBottom>
              Question
            </Typography>
          </Grid>

          <Grid container className="row-item">
            <Grid
              item
              sm={6}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                type="caption"
                gutterBottom
                className="custom-select-title"
              >
                Question type
              </Typography>

              <MUISelect
                value={content_type}
                onChange={e =>
                  updateCrateQuestionFields(e.target.value, "content_type")
                }
                MenuProps={{ PaperProps: { style: { width: 400 } } }}
              >
                {CONTENT_TYPE_LIST.map((item, index) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </MUISelect>
            </Grid>
            {hideArea && (
              <Grid item md={6} sm={12}>
                <Input
                  id="questionTitle"
                  value={questionTitle}
                  reducer={createDiagnosisQuestion}
                  label={"Title*"}
                  className="MUIControl"
                  style={{ marginTop: "12px" }}
                />
              </Grid>
            )}
          </Grid>

          {/*Title and Pain Area*/}
          {!hideArea && (
            <Grid container className="row-item">
              <Grid item md={6} sm={12}>
                <Input
                  id="questionTitle"
                  value={questionTitle}
                  reducer={createDiagnosisQuestion}
                  label={"Title*"}
                  className="MUIControl"
                />
              </Grid>
              {/* <Grid item md={6} sm={12} className="level-up-block">
                <AsyncAreaSelect
                  domain="diagnostics"
                  path="findArea"
                  valuePath="areaIds"
                  idKey="create_diagnostic_question"
                />
            </Grid> */}
            </Grid>
          )}

          {/* Question !!! */}
          <DiagnosticQuestion id="question" question={question} />

          {/* Question Key*/}
          <UniqueKey
            domain="diagnostics"
            path="findByKey"
            questionKey={questionKey}
            id="questionKey"
            currentId={currentId}
            reducer="createDiagnosisQuestion"
            grid={6}
            className={"row-item level-up-neighborhood"}
          />

          {/* Sequence */}
          <SequenceBlock
            domain="diagnostics"
            path="sequenceList"
            reqType={SequenceBlockReqType}
            value={sequence}
            valuePath="sequence"
            typePath="sequenceType"
            type={sequenceType}
            list={sequenceList}
          />

          {/* Answers */}
          <Grid className="title answer">
            <Typography type="title" gutterBottom>
              Answers
            </Typography>
          </Grid>

          {/*Picker for question type*/}

          <DiagnosticAnswers answerType={answerType} typePath="answerType" />

          {/*Packages and Start levels*/}
          {packages && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "90px"
              }}
            >
              {/* Answers */}
              <Grid className="title answer">
                <Typography type="title" gutterBottom>
                  Packages & Levels
                </Typography>
              </Grid>

              <PackageLevelsList
                packageLevelsList={packageLevelsList}
                areaIds={areaIds}
              />
            </div>
          )}
        </div>

        <div className="rules">
          {showLevelUp && (
            <Grid container className="row-item">
              <Grid item xs={12} className="level-up-block">
                <FormControlLabel
                  label={"Redirect to the next level"}
                  className="level-up-block-label"
                  control={
                    <Checkbox
                      checked={levelup_result}
                      onChange={e =>
                        updateCrateQuestionFields(
                          e.target.checked,
                          "levelup_result"
                        )
                      }
                    />
                  }
                />
                <Typography type="caption">
                  <span style={{ paddingLeft: "20px" }}>
                    After successful execution of the rules to redirect the user
                    to the next level.
                  </span>
                </Typography>
              </Grid>
            </Grid>
          )}

          {content_type === "functionalTest" && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <AssetsList
                assetsListConverter={list =>
                  this._assetsListConverter(list, "video")
                }
                list={get(files, `[${labelLang}].video`, [])}
                title="Video"
                path="assets"
                domain="diagnostics"
                valuePath={valueVideoPath}
                multiSelect={false}
                listValue={false}
              />
              <AssetsList
                assetsListConverter={list =>
                  this._assetsListConverter(list, "image")
                }
                list={diagnostic_assets}
                title="Poster"
                path="assets"
                domain="diagnostics"
                valuePath="diagnostic_assets"
                multiSelect={false}
                listValue={false}
              />
            </div>
          )}

          {rules_links && <RulesLinks typeValue={evaluation_result} />}

          <DiagnosisRulesComponent
            type={reqType || "diagnostic"}
            page={page || "diagnostic"}
            area={areaIds}
            step={sequence}
          />
        </div>
      </BlockDivider>
    );
  }
}

DiagnosisTypeQuestion.defaultProps = {
  sequenceList: [],
  SequenceBlockReqType: "diagnostic"
};

DiagnosisTypeQuestion.propTypes = {
  sequenceList: PropTypes.array,
  SequenceBlockReqType: PropTypes.string
};

const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatch }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiagnosisTypeQuestion);

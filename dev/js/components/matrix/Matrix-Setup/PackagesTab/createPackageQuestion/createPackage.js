import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import {
  updateCrateQuestionFields,
  clearCreateQuestion,
  findUniqueKey,
  getPackagenById,
  findArea }                        from '../../../../../actions';
import { onChange }                 from '../../../../../actions/common';
import {
  BlockDivider,
  AsyncAreaSelect,
  UniqueKey
}                                   from '../../../../common';


import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../../common/Input/Input';
import SELECT                       from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Tabs, { Tab }                from 'material-ui/Tabs';
import PackageLevelComponent        from './packageLevel';
import { submitTabs }               from '../../../../../utils/matrix';
import MatrixPreLoader              from '../../matrixPreloader';



export const THERAPY = [
  { value: '1',  label: 'Daily'},
  { value: '2',  label: 'Every other day'},
  { value: '7',  label: 'Weekly'},
  { value: '2H', label: 'Every two hours'},
  { value: 'ME', label: 'Morning and evening'},
];

export const PACKAGE_TYPE = [
  {value: 'symptomatic', label: 'Symptomatic'},
  {value: 'therapeutic', label: 'Therapeutic'}
];

export const DEFAULT_LEVEL = {
  level             : 1,
  level_up_origin   : {
    vas     : '1',
    vas_min : '1',
    sessions: '1'
  },
  therapy_continuity: '1',
  exercise_ids      : [],
};

class CreatePackageComponent extends Component {
  state = {
    questionType    : 'packages',
    keyIsUniqueError: '',
    tab: '0'
  };

  constructor(props) {
    super(props);
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillMount() {
    if (this.props.params.id) {
      getPackagenById('exercises', 'packages', this.props.params.id).then(() =>
        browserHistory.push(`/packages-create/${this.props.routeParams.id}?level=${0}`))
    }
    else {
      const newOne = Object.assign({}, DEFAULT_LEVEL);
      updateCrateQuestionFields([newOne], 'packageLevels');
    }
  }

  done = (value) => {
    const { area, questionKey, questionTitle, packageLevels, therapyContinuity, packageType } = value;

    const result = {
      key      : questionKey,
      area_id  : area ? area.value : null,
      title    : questionTitle,
      type     : packageType,
      package_levels : packageLevels,
    };

    debugger;

    submitTabs(
      'exercises',
      'packages',
      result,
      '/matrix-setup/packages',
      this.props.routeParams.id
    );
  };

  cancel = () => browserHistory.push(`/matrix-setup/packages`);

  handleTabChange = (event, tab) => {
    this.setState({ tab });
//    browserHistory.push(`/packages-create/${this.props.routeParams.packageId}?level=${tab}`);
  };

  addNewLevel = (oldList) => {
    const newList = oldList.concat({
      level: oldList.length + 1,
        level_up_origin   : {
        vas     : '1',
        vas_min : '1',
        sessions: '1'
      },
      therapy_continuity: '1',
      exercise_ids      : [],
    });
    updateCrateQuestionFields(newList, 'packageLevels');
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
          <span>Create Package</span>
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

        {/*rightClassName="package-tabs-wrapper"*/}
        <BlockDivider title="Package" >
          <div className="main-question" style={{width:'100%'}}>

            <Grid container>
              <Grid item xs={12}>
                <Typography type="title">
                  Package
                </Typography>
              </Grid>
            </Grid>

            {/*Title and Body Area*/}
            <Grid container className="row-item">
              <Grid item md={6} sm={12}>
                <Input
                  id='questionTitle'
                  value={questionTitle}
                  reducer={ createDiagnosisQuestion }
                  label={ L_CREATE_QUESTION.questionTitle }
                  placeholder={ L_CREATE_QUESTION.enterTitle }
                />
              </Grid>
              <Grid item md={6} sm={12} >
                <AsyncAreaSelect
                  domain="diagnostics"
                  path="findArea"
                  valuePath="area"
                  idKey="create_packages_question"
                />
              </Grid>
            </Grid>

            {/* Question Key */}
            <UniqueKey
              domain="diagnostics"
              path="findByKey"
              questionKey={questionKey}
              label="Package Key"
              id="questionKey"
              reducer="createDiagnosisQuestion"
            />

            <Grid container className="row-item">
              <Grid item md={6} sm={12}>
                <Typography
                  type="caption"
                  gutterBottom
                  className="custom-select-title">
                  Type
                </Typography>
                <SELECT
                  value={packageType}
                  onChange={(event) => updateCrateQuestionFields(event.target.value, 'packageType')}
                  className="MuiFormControlDEFAULT"
                >
                  {PACKAGE_TYPE.map((item, index) => (
                    <MenuItem
                      key={item.value}
                      value={item.value}
                      style={{
                        fontWeight: PACKAGE_TYPE.indexOf(item.value) !== -1 ? '500' : '400',
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </SELECT>
              </Grid>
              <Grid item md={6} sm={12} >
                {/*<Typography*/}
                {/*type="caption"*/}
                {/*gutterBottom*/}
                {/*className="custom-select-title">*/}
                {/*Therapy continuity*/}
                {/*</Typography>*/}
                {/*<SELECT*/}
                {/*value={therapyContinuity}*/}
                {/*onChange={(event) =>  updateCrateQuestionFields(event.target.value, 'therapyContinuity')}*/}
                {/*className="MuiFormControlDEFAULT"*/}
                {/*>*/}
                {/*{THERAPY.map((item, index) => (*/}
                {/*<MenuItem*/}
                {/*key={item.value}*/}
                {/*value={item.value}*/}
                {/*style={{*/}
                {/*fontWeight: PACKAGE_TYPE.indexOf(item.value) !== -1 ? '500' : '400',*/}
                {/*}}*/}
                {/*>*/}
                {/*{item.label}*/}
                {/*</MenuItem>*/}
                {/*))}*/}
                {/*</SELECT>*/}
              </Grid>
            </Grid>
          </div>

          <div className="page-tabs">
            {/*className="row-item package-level-header margin-remove"*/}
            {/*className="package-level-header-item-left"*/}
            <Grid container className="package-level-header">
              <Grid item xs={6} className="package-level-header-item-left">
                <Typography
                  type="title">
                  Levels
                </Typography>
              </Grid>
              <Grid item xs={6} className="package-level-header-item-right">
                <Button color="primary" onClick={() => this.addNewLevel(packageLevels)}>
                  + ADD LEVEL
                </Button>
              </Grid>
            </Grid>

            <div>
              <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                fullWidth
              >
                {packageLevels.map((item, index) =>
                  <Tab key={index} label={`Level ${item.level}`}/>)}
              </Tabs>
            </div>

            {packageLevels.map((level, index) =>
              <div className="tab-item"
                   key={index}>
                {
                  +this.state.tab === index &&
                  <PackageLevelComponent
                    packageId={packageId}
                    index={index}
                    level={level}
                  />
                }
              </div>
            )}

          </div>
        </BlockDivider>
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

export default  connect(mapStateToProps, mapDispatchToProps)(CreatePackageComponent);
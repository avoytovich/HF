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
import PackageLevelComponent        from './PackageLevelComponent';
import { submitTabs }               from '../../../../../utils/matrix';
import MatrixPreLoader              from '../../matrixPreloader';
import { CreateItemNavButtons }     from '../../../../common';


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
  level               : 1,
  level_up_properties : {
    vas_trend_down        : 1,
    vas_min               : 1,
    package_level_sessions: 1,
    therapy_continuity    : 1
  },
  therapy_continuity: '1',
  exercises         : [],
};

class CreatePackageComponent extends Component {
  levelList = [];

  state = {
    questionType    : 'packages',
    keyIsUniqueError: '',
    tab: '0',
    loading: false
  };

  constructor(props) {
    super(props);
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, 'page');
  }


  componentWillMount() {
    if (this.props.params.id) {
      this.setState({loading: true});
      getPackagenById('exercises', 'packages', this.props.params.id).then(res => {
//        browserHistory.push(`/packages-create/${this.props.routeParams.id}?level=${0}`)
        const { packageLevels } = res;
        this.levelList = packageLevels.data;
        this.setState({loading: false});
      })

    }
    else {
//      const newOne = Object.assign({}, DEFAULT_LEVEL);
//      updateCrateQuestionFields([newOne], 'packageLevels');
    }
  }

  componentWillUnmount() {
    clearCreateQuestion();
  }

  done = (value) => {
    const {
      testing_mode, areaIds,
      questionKey, questionTitle,
      packageLevels, therapyContinuity,
      packageType, errors, app_title } = value;
    const validValue = { questionKey, questionTitle };

//    const _packageLevels = packageLevels.map((el, index) => {
//      const oldLevel = this.levelList[index];
//      return oldLevel && !el.id ? Object.assign({}, el, {id: oldLevel.id}) : el;
//    });

    const result = {
      key      : questionKey,
      areaIds  : areaIds,
      title    : questionTitle,
      type     : packageType,
      app_title,
      package_levels : packageLevels,
      testing_mode,
    };

    submitTabs(
      validValue,
      errors,
      'exercises',
      'packages',
      this.props.routeParams.id ? {...result, id: this.props.routeParams.id} : result,
      '/matrix-setup/packages',
      this.props.routeParams.id
    );
  };

  cancel = () => browserHistory.push(`/matrix-setup/packages`);

  handleTabChange = (event, tab) => {
    this.setState({ tab });
//    browserHistory.push(`/packages-create/${this.props.routeParams.packageId}?level=${tab}`);
  };

  changeLastSelectedIndex = () => {
    const currentTab = +this.state.tab;
    const nextTab = currentTab ? currentTab - 1 : currentTab;
    this.setState({tab: `${nextTab}`});
  };

  addNewLevel = (oldList) => {
    const newList = oldList.concat({
      level: oldList.length + 1,
      level_up_properties   : {
        vas_trend_down        : '1',
        vas_min               : '1',
        package_level_sessions: '1',
        therapy_continuity    : '1',
        package_level_days    : '1'
      },
      therapy_continuity: 'daily',
      exercises      : [],
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
        packageLevels,
        testing_mode
      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
      params: {
        packageId
      },
      routeParams: { id },
    } = this.props;

    return (
      <div id="create-question">
        <CreateItemNavButtons
          title={'Create Package'}
          showSwitch={true}
          showLangSwitcher={false}
          switchChecked={testing_mode}
          switchLabel={'Live'}
          onSwitchChange={(e, value) => updateCrateQuestionFields(!value , 'testing_mode')}
          onCancelClick={this.cancel}
          cancelLabel={'Cancel'}
          onSaveClick={() => this.done(createDiagnosisQuestion)}
          saveLabel={'Save'}
        />

        <div className="create-question-sub-container">
        { id && this.state.loading ?
          <MatrixPreLoader
            left="5"
            right="4"
          />
          :
          <BlockDivider title="Package" >
          <div className="main-question" style={{width:'100%'}}>

            <Grid container>
              <Grid item xs={12}>
                <Typography type="title">
                  Package
                </Typography>
              </Grid>
            </Grid>

            {/*Title and Pain Area*/}
            <Grid container className="row-item">
              <Grid item md={6} sm={12}>
                <Input
                  id='questionTitle'
                  value={questionTitle}
                  className="MUIControl"
                  reducer={ createDiagnosisQuestion }
                  label={ L_CREATE_QUESTION.questionTitle }
                  placeholder={ L_CREATE_QUESTION.enterTitle }
                />
              </Grid>
              <Grid item md={6} sm={12} >
                <AsyncAreaSelect
                  domain="diagnostics"
                  path="findArea"
                  valuePath="areaIds"
                  idKey="create_packages_question"
                />
              </Grid>
            </Grid>

            {/* Question Key */}
            <Grid container className="row-item">
              <Grid item md={6} sm={12}>
                <Input
                  id='app_title'
                  reducer={ createDiagnosisQuestion }
                  label={ 'App Title' }
                  style={{width: '100%'}}
                />
              </Grid>

              <Grid item md={6} sm={12}>
                <UniqueKey
                  domain="diagnostics"
                  path="findByKey"
                  questionKey={questionKey}
                  label="Package Key*"
                  id="questionKey"
                  currentId={id}
                  reducer="createDiagnosisQuestion"
                  className="_"
                  style={{width: '100%'}}
                />
              </Grid>
            </Grid>

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
            </Grid>
          </div>

          <div className="page-tabs">
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
                  <Tab key={index} label={`Level ${index + 1}`}/>)}
              </Tabs>
            </div>

            {packageLevels.map((level, index) => {
              const { therapy_continuity, exercises} = level;
              return <div className="tab-item"
                          key={index}>
                {
                  +this.state.tab === index &&
                  <PackageLevelComponent
                    packageId={packageId}
                    index={index}
                    level={level}
                    therapy_continuity={therapy_continuity}
                    exercises={exercises}
                    changeTab={this.changeLastSelectedIndex}
                  />
                }
              </div>
            })}

          </div>
        </BlockDivider>
        }
        </div>
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
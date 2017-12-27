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
  findArea }                        from '../../../../actions';
import { onChange }                 from '../../../../actions/common';
import { Async }                    from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../common/Input/Input';
import SELECT                       from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Tabs, { Tab }                from 'material-ui/Tabs';
import PackageLevelComponent        from './packageLevel'

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
    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillMount() {
    if (this.props.params.packageId) {
      getPackagenById('exercises', 'packages', this.props.params.packageId).then(() =>
        browserHistory.push(`/packages-create/${this.props.routeParams.packageId}?level=${0}`))
    }
    else {
      const newOne = Object.assign({}, DEFAULT_LEVEL);
      updateCrateQuestionFields([newOne], 'packageLevels');
    }
  }

  componentWillUnmount() { clearCreateQuestion(); }

  getOptions = (input) => {
    return findArea('diagnostics', 'findArea').then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.title }));
      return {
        options: [{ label: 'All', value: null, id: null }].concat(_data),
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      }
    });
  };

  onAreasChange = (value) => updateCrateQuestionFields(value, 'bodyAreas');

  addNewAnswer = (value) => {
    const inState = this.state.answerLang;
    this.setState({ answerLang: inState.concat('en')});
    addNewAnswer(value);
  };

  checkIfQuestionKeyValid = (event, value) => {
    this.props.onChange(event, value);

    if (event.target.value.length > 3) {
      findUniqueKey('diagnostics', 'findCondByKey', event.target.value).then(res => {
        if (res) {
          this.setState({keyIsUniqueError: 'Key is not Unique'});
        }
        else if (!res && this.state.keyIsUniqueError){
          this.setState({keyIsUniqueError: ''});
        }
      });
    }
  };


  done = (value) => {
    const { bodyAreas, questionKey, questionTitle, packageLevels, therapyContinuity, packageType } = value;

    const result = {
      key      : questionKey,
      body_area: bodyAreas ? bodyAreas.id : null,
      title    : questionTitle,
      type     : packageType,
      package_levels : packageLevels,
    };


    !this.props.routeParams.packageId ?
      diagnosisQuestionCreate('exercises', 'packages', result)
      .then(() => browserHistory.push(`/matrix-setup/packages`)) :

      updateQuestionCreate('exercises', 'packages', {...result, id: this.props.routeParams.packageId})
      .then(() => browserHistory.push(`/matrix-setup/packages`))

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
                  <Typography
                    type="caption"
                    gutterBottom
                    className="custom-select-title">
                    Body Areas
                  </Typography>
                  <Async
                    name='body-areas'
                    id='body-areas'
                    loadOptions={this.getOptions}
                    onChange={this.onAreasChange}
                    placeholder={'Select body area'}
                    value={bodyAreas}/>
                </Grid>
              </Grid>

              {/* Question Key */}
              <Grid container className="row-item">
                <Grid item xs={12}>
                  <Input
                    id='questionKey'
                    value={questionKey}
                    reducer={createDiagnosisQuestion}
                    label={ 'Package Key' }
                    placeholder={ L_CREATE_QUESTION.enterQuestionKey }
                    error={!!this.state.keyIsUniqueError}
                    onCustomChange={this.checkIfQuestionKeyValid}
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
          </Grid>

          <Grid item
                md={6}
                sm={12}
                className="rules">

            <Grid container className="row-item package-level-header margin-remove">
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
            <Tabs
              value={this.state.tab}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              fullWidth
            >
              {packageLevels.map((item, index) => <Tab key={index} label={`Level ${item.level}`}/>)}
            </Tabs>
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

export default  connect(mapStateToProps, mapDispatchToProps)(CreatePackageComponent);
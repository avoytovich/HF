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
import { AsyncCreatable }           from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../common/Input/Input';
import SELECT                       from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Tabs, { Tab }                from 'material-ui/Tabs';


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
    if (this.props.routeParams.id) {
      getPackagenById('exercises', 'packages', this.props.routeParams.id);
    }
  }

  componentWillUnmount() { clearCreateQuestion(); }

  getOptions = (input) => {
    return findArea('diagnostics', 'findArea').then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.title }));
      return {
        options: _data,
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
    debugger;
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
      .then(() => browserHistory.push(`/matrix-setup/packages`)) :

      updateQuestionCreate('exercises', 'packages', result, this.props.routeParams.id)
      .then(() => browserHistory.push(`/matrix-setup/packages`))

  };

  cancel = () => browserHistory.push(`/matrix-setup/packages`);

  handleTabChange = (event, tab) => this.setState({ tab });

  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        bodyAreas,
        questionKey,
        packageType,
        therapyContinuity,
      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
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
                  <AsyncCreatable
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
                  <Typography
                    type="caption"
                    gutterBottom
                    className="custom-select-title">
                    Therapy continuity
                  </Typography>
                  <SELECT
                    value={therapyContinuity}
                    onChange={(event) =>  updateCrateQuestionFields(event.target.value, 'therapyContinuity')}
                    className="MuiFormControlDEFAULT"
                  >
                    {THERAPY.map((item, index) => (
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
          </Grid>

          <Grid item
                md={6}
                sm={12}
                className="rules">

            <Grid container className="row-item package-level-header">
              <Grid item xs={6} className="package-level-header-item-left">
                  <Typography
                    type="title">
                    Exercises
                  </Typography>
              </Grid>
              <Grid item xs={6} className="package-level-header-item-right">
                <Button color="primary" onClick={() => {}}>
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
              <Tab label="Level 1" />

            </Tabs>
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
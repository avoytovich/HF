import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import DiagnosisRulesComponent      from '.././createDiagnosisQuestion/diagnosisRules';
import { browserHistory }           from 'react-router'
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  findUniqueKey,
  findPackage,
  findArea }                        from '../../../../actions';
import { onChange }                 from '../../../../actions/common';
import { AsyncCreatable, Async }    from 'react-select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../common/Input/Input';
import Select                       from 'material-ui/Select';

class CreateTreatmentsComponent extends Component {
  state = {
    questionType    : 'treatments',
    keyIsUniqueError: '',
    treatmentsLevels: [],
  };

  constructor(props) {
    super(props);
    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillUnmount() { clearCreateQuestion(); }

  getAreaOptions = (input) => {
    return findArea('diagnostics', 'findArea').then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.title }));
      return {
        options: _data,
        complete: true
      }
    });
  };

  getPackageOptions = (input) => {
    const area = this.props.createDiagnosisQuestion.bodyAreas;
    const _area = area.key || area.value || area.title;
    return findPackage('diagnostics', 'getPackageByArea', input, _area).then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.title }));
      return {
        options: _data,
        complete: true
      }
    });
  };


  onAreasChange = (value) => updateCrateQuestionFields(value, 'bodyAreas');

  onPackageChange = (value) => {
    const levels = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 }
    ];
    this.setState({treatmentsLevels: levels});
    updateCrateQuestionFields(value, 'treatmentsPackage');
  };

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

  handleLevelsChange = (event) => {
    const sequenceType = event.target.value;
    updateCrateQuestionFields(sequenceType, 'treatmentsLevels');
  };

  done = (value) => {
    const { bodyAreas, questionKey, questionTitle, treatmentsLevels, treatmentsPackage, rules } = value;
    const result = {
      rule   : rules,
      key    : questionKey,
      area   : bodyAreas.key || bodyAreas.value,
      title  : questionTitle,
      package: treatmentsPackage.value,
      level  : treatmentsLevels,
    };
    diagnosisQuestionCreate('diagnostics', 'treatments', result)
    .then(() => browserHistory.push(`/matrix-setup/treatments`));
  };


  cancel = () => browserHistory.push(`/matrix-setup/treatments`);


  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        bodyAreas,
        questionKey,
        treatmentsLevels,
        treatmentsPackage
      },
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
                    loadOptions={this.getAreaOptions}
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
                    label={ L_CREATE_QUESTION.questionKey }
                    placeholder={ L_CREATE_QUESTION.enterQuestionKey }
                    error={!!this.state.keyIsUniqueError}
                    onCustomChange={this.checkIfQuestionKeyValid}
                  />
                </Grid>
              </Grid>


              {/*Package and Start level*/}
              <Grid container className="row-item">
                <Grid item md={6} sm={12} >
                  <Typography
                    type="caption"
                    gutterBottom
                    className="custom-select-title">
                    Package
                  </Typography>
                  <Async
                    name='package'
                    id='package'
                    loadOptions={this.getPackageOptions}
                    onChange={this.onPackageChange}
                    placeholder={'Select package'}
                    value={treatmentsPackage}/>
                </Grid>
                <Grid item md={6} sm={12}>
                  <Typography
                    type="caption"
                    gutterBottom
                    className="custom-select-title"
                    style={{marginBottom: '8px'}}
                    >
                    Start from level
                  </Typography>
                  <Select
                    value={treatmentsLevels}
                    onChange={this.handleLevelsChange}
                    disabled={!this.state.treatmentsLevels.length}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          width: 400,
                        },
                      },
                    }}
                  >
                    {this.state.treatmentsLevels.map((item, index) => (
                      <MenuItem
                        key={item.value}
                        value={item.value}
                        style={{
                          fontWeight: this.state.treatmentsLevels.indexOf(item.value) !== -1 ? '500' : '400',
                        }}
                      >
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

            </div>
          </Grid>

          <Grid item
                md={6}
                sm={12}
                className="rules">

            <DiagnosisRulesComponent
              page="treatments"
              type="diagnostic"
              area={bodyAreas}
              step={null}
            />

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

export default  connect(mapStateToProps, mapDispatchToProps)(CreateTreatmentsComponent);
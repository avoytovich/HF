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
  findPackage,
  getTreatmentById,
  getPackagenById,
}                                   from '../../../../../actions';
import { onChange }                 from '../../../../../actions/common';
import { Async }                    from 'react-select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../../common/Input/Input';
import Select                       from 'material-ui/Select';
import { submitTabs }               from '../../../../../utils/matrix';
import MatrixPreLoader              from '../../matrixPreloader';

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
      getTreatmentById('diagnostics', 'treatments', this.props.routeParams.id);
    }
  }


  getPackageOptions = (input) => {
    const area = this.props.createDiagnosisQuestion.bodyAreas;
    const _area = area ? area.id : null;
    return findPackage('exercises', 'getPackageByArea', input, _area).then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.title }));
      return {
        options: _data,
        complete: true
      }
    });
  };

  onPackageChange = (value) => {
    updateCrateQuestionFields(value, 'treatmentsPackage');
    getPackagenById('exercises', 'packages', value.id, true).then(({data}) => {
      const levels = data.map(el => el && {label: el.level, value: el.id, id: el.id});
      this.setState({treatmentsLevels: levels});
    });
  };

  addNewAnswer = (value) => {
    const inState = this.state.answerLang;
    this.setState({ answerLang: inState.concat('en')});
    addNewAnswer(value);
  };

  handleLevelsChange = (event) => {
    const sequenceType = event.target.value;
    updateCrateQuestionFields(sequenceType, 'treatmentsLevels');
  };

  done = (value) => {
    const { areaIds, questionKey, questionTitle, treatmentsLevels, treatmentsPackage, rules } = value;
    const result = {
      areaIds,
      rule   : rules[0],
      key    : questionKey,
      title  : questionTitle,
      package: treatmentsPackage.id,
      level  : treatmentsLevels,
    };

    submitTabs(
      'diagnostics',
      'treatments',
      result,
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
        treatmentsPackage
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
              <Grid container className="row-item">
                <Grid item md={6} sm={12}>
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
                    value={treatmentsPackage}
                    clearable={false}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Typography
                    type="caption"
                    gutterBottom
                    className="custom-select-title"
                    style={{marginBottom:'8px'}}
                  >
                    Start from level
                  </Typography>
                  <Select
                    value={treatmentsLevels}
                    onChange={this.handleLevelsChange}
                    disabled={!this.state.treatmentsLevels.length}
                    MenuProps={{PaperProps:{style:{width: 400}}}}
                  >
                    {this.state.treatmentsLevels.map((item, index) => (
                      <MenuItem
                        key={item.value}
                        value={item.value}
                        style={{
                          fontWeight:this.state.treatmentsLevels.indexOf(item.value) !== -1 ? '500' : '400',
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

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
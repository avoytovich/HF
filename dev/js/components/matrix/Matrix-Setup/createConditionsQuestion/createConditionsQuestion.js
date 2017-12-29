import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import DiagnosisRulesComponent      from '.././createDiagnosisQuestion/diagnosisRules';
import { browserHistory }           from 'react-router'
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  findUniqueKey,
  getConditionById,
  updateQuestionCreate,
  findArea }                        from '../../../../actions';
import { onChange }                 from '../../../../actions/common';
import { Async }                    from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../common/Input/Input';

class CreateConditionComponent extends Component {
  state = {
    questionType    : 'condition',
    keyIsUniqueError: '',
  };

  constructor(props) {
    super(props);
    clearCreateQuestion();
    updateCrateQuestionFields(this.state.questionType, 'page');
  }


  componentWillMount() {
    if (this.props.routeParams.id) {
      getConditionById('diagnostics', 'getConditionById', this.props.routeParams.id);
    }
  }


  getOptions = (input) => {
    return findArea('diagnostics', 'findArea').then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, item, { label: item.title }));
      return {
        options: [{ label: 'All', value: null, id: 0 }].concat(_data),
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
    const { area, questionKey, questionTitle, rules } = value;
    debugger;
    const result = {
      rule  : rules[0],
      key   : questionKey,
      area  : area ? area.id : null,
      title : questionTitle
    };

    !this.props.routeParams.id ?
      diagnosisQuestionCreate('diagnostics', 'conditions', result)
      .then(() => browserHistory.push(`/matrix-setup/conditions`)) :

      updateQuestionCreate('diagnostics', 'conditions', result, this.props.routeParams.id)
      .then(() => browserHistory.push(`/matrix-setup/conditions`))
  };


  cancel = () => browserHistory.push(`/matrix-setup/conditions`);


  render() {
    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        area,
        questionKey,
        sequence
      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
    } = this.props;

    return (
      <div id="create-question">
        <div className="page-sub-header">
          <span>Create Condition</span>
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
        <Grid container className="margin-remove" style={{height: '100%'}}>

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
                  <Async
                    name='body-areas'
                    id='body-areas'
                    loadOptions={this.getOptions}
                    onChange={this.onAreasChange}
                    placeholder={'Select body area'}
                    value={area}/>
                </Grid>
              </Grid>

              {/* Question Key */}
              <Grid container className="row-item">
                <Grid item xs={12}>
                  <Input
                    id='questionKey'
                    value={questionKey}
                    reducer={createDiagnosisQuestion}
                    label={ 'Condition Key' }
                    placeholder={ L_CREATE_QUESTION.enterQuestionKey }
                    error={!!this.state.keyIsUniqueError}
                    onCustomChange={this.checkIfQuestionKeyValid}
                  />
                </Grid>
              </Grid>


            </div>
          </Grid>

          <Grid item
                md={6}
                sm={12}
                className="rules">

            <DiagnosisRulesComponent
              page="conditions"
              type="diagnostic"
              area={area}
              step={sequence}
              showTitle={true}
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

export default  connect(mapStateToProps, mapDispatchToProps)(CreateConditionComponent);
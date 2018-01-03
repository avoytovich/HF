import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router';
import { submitTabs }               from '../../../../../utils/matrix';
//Actions
import {
  updateCrateQuestionFields,
  clearCreateQuestion,
  getConditionById,
}                                   from '../../../../../actions';
//Components
import {
  DiagnosisRulesComponent,
  BlockDivider,
  AsyncAreaSelect,
  UniqueKey
}                                   from '../../../../common';
import MatrixPreLoader              from '../../matrixPreloader';
//UI
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import Input                        from '../../../../common/Input/Input';


class CreateConditionComponent extends Component {
  state = { questionType    : 'condition' };

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

  done = (value) => {
    const { area, questionKey, questionTitle, rules } = value;

    const result = {
      rule  : rules[0],
      key   : questionKey,
      area_id  : area ? area.value : null,
      title : questionTitle
    };

    submitTabs(
      'diagnostics',
      'conditions',
      result,
      '/matrix-setup/conditions',
      this.props.routeParams.id
    );
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
      routeParams: { id },
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

        {  id && !questionKey ?
          <MatrixPreLoader
            left="3"
            right="2"
          />
          :
          <BlockDivider title="Condition">
          <div className="main-question" style={{width: '100%'}}>

            <Grid className="title">
              <Typography type="title" gutterBottom>
                Condition
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
              <Grid item md={6} sm={12} >
                <AsyncAreaSelect
                  domain="diagnostics"
                  path="findArea"
                  valuePath="area"
                  idKey="create_condition_question"
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
          </div>

          <div className="rules">
            <DiagnosisRulesComponent
              page="conditions"
              type="diagnostic"
              area={area}
              step={sequence}
              showTitle={true}
            />
          </div>
        </BlockDivider>
        }
      </div>
    )
  }
}

const mapStateToProps   = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  commonReducer          : state.commonReducer,
});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateConditionComponent);
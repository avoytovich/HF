import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  updateQuestionCreate,
  getTreatmentById}                 from '../../../../../actions';
import { onChange }                 from '../../../../../actions/common';
import { AsyncCreatable }           from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Input                        from '../../../../common/Input/Input';
import { find, get }                from 'lodash'

class CreateBodyAreaComponent extends Component {
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
      getTreatmentById('diagnostics', 'areas', this.props.routeParams.id);
    }
  }

  componentWillUnmount() { clearCreateQuestion(); }

  done = (value) => {
    const { bodyAreas, questionKey, questionTitle, questionDescription } = value;
    const result = {
      key           : questionKey,
      title         : questionTitle,
      description   : questionDescription,
    };

    !this.props.routeParams.id ?
      diagnosisQuestionCreate('diagnostics', 'bodyArea', result)
        .then(() => browserHistory.push(`/matrix-setup/body-area`)) :

      updateQuestionCreate('diagnostics', 'bodyArea', result, this.props.routeParams.id)
        .then(() => browserHistory.push(`/matrix-setup/body-area`,this.props.routeParams.id))

  };

  cancel = () => browserHistory.push(`/matrix-setup/body-area`);


  render() {
    let {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle,
        questionKey,
        questionDescription
      }
    } = this.props;


    console.log(this.props)
    return (
      <div id="create-question">
        <div className="page-sub-header">
          <span>Create Body Area</span>
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
                <Grid item md={12} sm={12}>
                  <Input
                    id='questionTitle'
                    value={questionTitle}
                    reducer={ createDiagnosisQuestion }
                    label={'Title' }
                    placeholder={'Title' }
                  />
                </Grid>
              </Grid>

              {/* Question Key */}
              <Grid container className="row-item">
                <Grid item xs={12}>
                  <Input
                    id='questionKey'
                    value={questionKey}
                    reducer={createDiagnosisQuestion}
                    label={ 'Key' }
                    placeholder={ 'Key'}
                    error={!!this.state.keyIsUniqueError}
                  />
                </Grid>
              </Grid>


              <Grid container className="row-item">
                <Grid item xs={12}>
                  <Input
                    id='questionDescription'
                    value={questionDescription}
                    reducer={createDiagnosisQuestion}
                    label={ 'Description' }
                    placeholder={ 'Description'}
                  />
                </Grid>
              </Grid>


            </div>
          </Grid>

        </Grid>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  commonReducer          : state.commonReducer,
  bodyArea                  : state.tables.bodyArea
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateBodyAreaComponent);
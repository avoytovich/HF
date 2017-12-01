import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import Select                   from 'react-select';
import DiagnosisRulesComponent  from './diagnosisRules';

// UI
import Grid                     from 'material-ui/Grid';
import Button                   from 'material-ui/Button';
import Typography               from 'material-ui/Typography';
import TextField                from 'material-ui/TextField';
import { bindActionCreators }   from 'redux';
import Input                    from '../../../common/Input/Input';



class CreateQuestionComponent extends Component {
  state = {
    questionType: 'Diagnosis',

    backPath: '',
    answer: [1,2,3]
  };

  getOptions = (input, callback) => {
    setTimeout(() => {
      callback(null, {
        options: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' }
        ],
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      });
    }, 500);
  };

  done = () => {
    console.log('this.props', this.props);
    this.props.router.goBack();
//    browserHistory.push(`/${this.state.backPath}`);
  };

  cancel = () => {
    this.props.router.goBack();
//    browserHistory.push(`/${this.state.backPath}`);
  };

  onChange = () => {}

  addAnswer = () => {
    const answer = this.state.answer.concat(1);
    this.setState({answer})
  };

  render() {

    const {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        question
      },
      commonReducer: {
        currentLanguage: { L_CREATE_QUESTION },
      },
    } = this.props;

    debugger;

    return (
      <div id="create-question">
        <div className="page-sub-header">
          <span>Create Question</span>
          <div className="nav-buttons">

            <Button raised
                    dense
                    onClick={this.cancel}
                    color="primary">
              Cancel
            </Button>

            <Button raised
                    dense
                    onClick={this.done}
                    color="primary">
              Done
            </Button>

          </div>
        </div>
        <Grid container className="margin-remove">

          <Grid item
                md={6}
                sm={12}
                className="create-question-body">

            <div className="main-question">
              <Grid className="title">
                <Typography type="title" gutterBottom>
                  Question
                </Typography>
              </Grid>

              <Grid container className="row-item">
                <Grid item
                       md={6}
                       sm={12}>
                  <TextField
                    id="questionType"
                    label="Question Type"
                    value={this.state.questionType}
                    disabled={true}
                  />
                </Grid>

                <Grid item
                       md={6}
                       sm={12}>

                  <Typography
                    type="caption"
                    gutterBottom>
                    Body Areas
                  </Typography>

                  <Select.Async
                    name="body-areas"
                    loadOptions={this.getOptions}
                    onChange={this.onChange}
                    />
                </Grid>

              </Grid>

              <Grid container className="row-item">
                <Grid item xs={12}>
                  <Input
                    id='question'
                    value={question}
                    reducer={createDiagnosisQuestion}
                    label={ L_CREATE_QUESTION.question }
                    placeholder={ L_CREATE_QUESTION.enterQuestion }
                  />
                </Grid>
              </Grid>


              {/*<div className="item-wrap-column">*/}
                {/*<span className="label-text">Type of Question</span>*/}
                {/*<Select.Async*/}
                  {/*name="type-of-question"*/}
                  {/*loadOptions={this.getOptions}*/}
                  {/*onChange={this.onChange}*/}
                {/*/>*/}
              {/*</div>*/}

              {/*<div className="item-wrap-column">*/}
                {/*<span className="label-text">Type of Question</span>*/}

                {/*<div className="sub-item-wrap">*/}
                  {/*<input type="text" className="Input-ui"/>*/}
                  {/*/!*<RaisedButton label="+ Add"   className="page-navigation-button" onClick={() => this.done()} />*!/*/}
                {/*</div>*/}

              {/*</div>*/}

              {/*<div className="item-wrap-column">*/}
                {/*<span className="label-text">Type of Question</span>*/}
                {/*<textarea className="Input-ui question-context"/>*/}
              {/*</div>*/}

              {/*<div className="item-wrap-row">*/}

                {/*<div className="item-wrap">*/}
                  {/*<span className="label-text">Question Key</span>*/}

                  {/*<Select.Async*/}
                    {/*name="type-of-question"*/}
                    {/*loadOptions={this.getOptions}*/}
                    {/*onChange={this.onChange}*/}
                  {/*/>*/}
                {/*</div>*/}

                {/*<div className="item-wrap">*/}

                  {/*<span className="label-text">Sequence</span>*/}
                  {/*<input type="number" className="Input-ui"/>*/}
                {/*</div>*/}
              {/*</div>*/}

              {/*<br/>*/}

              {/*<div className="title">*/}
                {/*Answers*/}
              {/*</div>*/}

              {/*<div className="item-wrap-column">*/}
                {/*<span className="label-text">Type of Answer</span>*/}
                {/*<div className="item-wrap-row margin-top-remove">*/}
                  {/*/!*<RaisedButton label="Single"     className="page-navigation-button"/>*!/*/}
                  {/*/!*<RaisedButton label="Continuous" className="page-navigation-button"/>*!/*/}
                  {/*/!*<RaisedButton label="Multiple"   className="page-navigation-button"/>*!/*/}
                {/*</div>*/}
              {/*</div>*/}

              {/*<br/>*/}

              {/*<span className="label-text">Answers</span>*/}

              {/*<div className="item-wrap-column margin-top-remove">*/}

                {/*{this.state.answer.map((item, i) =>*/}
                  {/*<div className="item-wrap-row" key={i} >*/}
                    {/*<div>{i + 1}</div>*/}
                    {/*<input type="string" className="Input-ui "/>*/}
                  {/*</div>*/}
                {/*)}*/}

                {/*/!*<RaisedButton label="+ Add Answer"*!/*/}
                {/*/!*className="page-navigation-button margin-top"*!/*/}
                {/*/!*onClick={this.addAnswer}/>*!/*/}
              {/*</div>*/}

            </div>
          </Grid>

          <Grid item
                md={6}
                sm={12}
                className="rules">

            <DiagnosisRulesComponent/>

          </Grid>

        </Grid>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  commonReducer: state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateQuestionComponent);

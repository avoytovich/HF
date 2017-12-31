import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import PropTypes                    from 'prop-types';

//Library
import { get }                      from 'lodash';

// Actions
import {
  updateCrateQuestionFields,
  findUniqueKey,
  addNewAnswer,
  removeAnswer
}                                   from '../../../../../actions';
import { onChange }                 from '../../../../../actions/common';
import Input                        from '../../../../common/Input/Input';
import {
  DiagnosisAssets,
  DiagnosisRulesComponent,
  AsyncAreaSelect
}                                   from '../../../../common';
import SequenceBlock                from './sequenceBlock';
import DiagnosticQuestion           from './diagnosticQuestion';
import DiagnosticAnswers            from './diagnosticAnswers';

// UI
import Grid                         from 'material-ui/Grid';
import Typography                   from 'material-ui/Typography';
import MUISelect                    from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import { Async }                    from 'react-select';




class DiagnosisTypeQuestion extends Component {
  state = {
    questionType    : 'diagnosis',
    answer          : [1,2,3],
    selectedValue   : 'single',
    answerType      : [
      {label: 'Single',   value: 'single'},
      {label: 'Range',    value: 'range'},
      {label: 'Multiple', value: 'multiple'},
    ],
    content_type_list : [
      {label: 'Question',        value: 'question'},
      {label: 'Functional test', value: 'functionalTest'},
    ],
    answerLang      : ['en', 'en'],
    keyIsUniqueError: '',
  };

  checkIfQuestionKeyValid = (event, value) => {
    this.props.onChange(event, value);

    if (event.target.value.length > 3) {
      findUniqueKey('diagnostics', 'findByKey', event.target.value).then(res => {
        if (res) {
          this.setState({keyIsUniqueError: 'Key is not Unique'});
        }
        else if (!res && this.state.keyIsUniqueError){
          this.setState({keyIsUniqueError: ''});
        }
      });
    }
  };


  render() {

    const {
      sequenceList,
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle, area, question, questionKey, sequence, sequenceType, answerType, content_type
      }
    } = this.props;

    const { content_type_list, keyIsUniqueError } = this.state;


    return <Grid container className="margin-remove">

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
            <Grid item sm={6} style={{display: 'flex', flexDirection: 'column'}}>
              <Typography
                type="caption"
                gutterBottom
                className="custom-select-title">
                Question type
              </Typography>

              <MUISelect
                value={content_type}
                onChange={e => updateCrateQuestionFields(e.target.value, 'content_type')}
                MenuProps={{ PaperProps: { style: { width: 400 }}}}
              >
                {content_type_list.map((item, index) => (
                  <MenuItem
                    key={ item.value }
                    value={ item.value }
                    style={{ fontWeight: this.state.answer.indexOf(item.value) !== -1 ? '500' : '400' }}>
                    {item.label}
                  </MenuItem>
                ))}
              </MUISelect>
            </Grid>
          </Grid>

          {/*Title and Body Area*/}
          <Grid container className="row-item">
            <Grid item md={6} sm={12}>
              <Input
                id='questionTitle'
                value={questionTitle}
                reducer={ createDiagnosisQuestion }
                label={ 'Title' }
              />
            </Grid>
            <Grid item md={6} sm={12} >

              <AsyncAreaSelect
                domain="diagnostics"
                path="findArea"
                valuePath="area"
                idKey="create_diagnostic_question"
              />

            </Grid>
          </Grid>

          {/* Question !!! */}
          <DiagnosticQuestion
            id="question"
            question={question}
          />

          {/* Question Key */}
          <Grid container className="row-item">
            <Grid item xs={12}>
              <Input
                id='questionKey'
                value={questionKey}
                reducer={createDiagnosisQuestion}
                label={ 'kl' }
                placeholder={ 'kkkk' }
                error={!!keyIsUniqueError}
                onCustomChange={this.checkIfQuestionKeyValid}
              />
            </Grid>
          </Grid>


          {/* Sequence */}
          <SequenceBlock
            domain="diagnostics"
            path="sequenceList"
            value={sequence}
            valuePath="sequence"
            typePath="sequenceType"
            type={sequenceType}
            list={sequenceList}
          />

          <Grid className="title answer">
            <Typography type="title"
                        gutterBottom>
              Answers
            </Typography>
          </Grid>

          <DiagnosticAnswers
            answerType={answerType}
            typePath="answerType"
          />

        </div>
      </Grid>

      <Grid item
            md={6}
            sm={12}
            className="rules">

        {content_type === "functionalTest" && <DiagnosisAssets/>}

        <DiagnosisRulesComponent
          type="diagnostic"
          page="diagnostic"
          area={area}
          step={sequence}
        />


      </Grid>

    </Grid>
  }
}


const mapStateToProps = state =>
  ({createDiagnosisQuestion: state.createDiagnosisQuestion});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

DiagnosisTypeQuestion.defaultProps = {
  sequenceList       : []
};

DiagnosisTypeQuestion.propTypes = {
  sequenceList       : PropTypes.array
};


export default  connect(mapStateToProps, mapDispatchToProps)(DiagnosisTypeQuestion);